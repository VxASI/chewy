/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Caret Team. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import codeInsidersCompletionSpec from '../../completions/code-insiders';
import type { ISuiteSpec } from '../helpers';
import { createCodeTestSpecs } from './code.test';

export const codeInsidersTestSuite: ISuiteSpec = {
	name: 'code-insiders',
	completionSpecs: codeInsidersCompletionSpec,
	availableCommands: 'code-insiders',
	testSpecs: createCodeTestSpecs('code-insiders')
};
