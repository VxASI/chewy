/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Caret Team. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import VsCodeTelemetryReporter from '@vscode/extension-telemetry';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { Api, getExtensionApi } from './api';
import { CommandManager } from './commands/commandManager';
import { registerBaseCommands } from './commands/index';
import { ExperimentationTelemetryReporter, IExperimentationTelemetryReporter } from './experimentTelemetryReporter';
import { ExperimentationService } from './experimentationService';
import { createLazyClientHost, lazilyActivateClient } from './lazyClientHost';
import { nodeRequestCancellerFactory } from './tsServer/cancellation.electron';
import { NodeLogDirectoryProvider } from './tsServer/logDirectoryProvider.electron';
import { ElectronServiceProcessFactory } from './tsServer/serverProcess.electron';
import { DiskTypeScriptVersionProvider } from './tsServer/versionProvider.electron';
import { ActiveJsTsEditorTracker } from './ui/activeJsTsEditorTracker';
import { ElectronServiceConfigurationProvider } from './configuration/configuration.electron';
import { onCaseInsensitiveFileSystem } from './utils/fs.electron';
import { Logger } from './logging/logger';
import { getPackageInfo } from './utils/packageInfo';
import { PluginManager } from './tsServer/plugins';
import * as temp from './utils/temp.electron';

export function activate(
	context: vscode.ExtensionContext
): Api {
	const pluginManager = new PluginManager();
	context.subscriptions.push(pluginManager);

	const commandManager = new CommandManager();
	context.subscriptions.push(commandManager);

	const onCompletionAccepted = new vscode.EventEmitter<vscode.CompletionItem>();
	context.subscriptions.push(onCompletionAccepted);

	const logDirectoryProvider = new NodeLogDirectoryProvider(context);
	const versionProvider = new DiskTypeScriptVersionProvider();

	const activeJsTsEditorTracker = new ActiveJsTsEditorTracker();
	context.subscriptions.push(activeJsTsEditorTracker);

	let experimentTelemetryReporter: IExperimentationTelemetryReporter | undefined;
	const packageInfo = getPackageInfo(context);
	if (packageInfo) {
		const { name: id, version, aiKey } = packageInfo;
		const vscTelemetryReporter = new VsCodeTelemetryReporter(aiKey);
		experimentTelemetryReporter = new ExperimentationTelemetryReporter(vscTelemetryReporter);
		context.subscriptions.push(experimentTelemetryReporter);

		// Currently we have no experiments, but creating the service adds the appropriate
		// shared properties to the ExperimentationTelemetryReporter we just created.
		new ExperimentationService(experimentTelemetryReporter, id, version, context.globalState);
	}

	const logger = new Logger();

	const lazyClientHost = createLazyClientHost(context, onCaseInsensitiveFileSystem(), {
		pluginManager,
		commandManager,
		logDirectoryProvider,
		cancellerFactory: nodeRequestCancellerFactory,
		versionProvider,
		processFactory: new ElectronServiceProcessFactory(),
		activeJsTsEditorTracker,
		serviceConfigurationProvider: new ElectronServiceConfigurationProvider(),
		experimentTelemetryReporter,
		logger,
	}, item => {
		onCompletionAccepted.fire(item);
	});

	registerBaseCommands(commandManager, lazyClientHost, pluginManager, activeJsTsEditorTracker);

	import('./task/taskProvider').then(module => {
		context.subscriptions.push(module.register(lazyClientHost.map(x => x.serviceClient)));
	});

	import('./languageFeatures/tsconfig').then(module => {
		context.subscriptions.push(module.register());
	});

	context.subscriptions.push(lazilyActivateClient(lazyClientHost, pluginManager, activeJsTsEditorTracker));

	return getExtensionApi(onCompletionAccepted.event, pluginManager);
}

export function deactivate() {
	fs.rmSync(temp.instanceTempDir.value, { recursive: true, force: true });
}
