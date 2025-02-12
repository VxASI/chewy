/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Caret Team. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import 'mocha';
import { testPaths, type ISuiteSpec } from '../../helpers';
import touchSpec from '../../../completions/upstream/touch';

const allOptions = [
	'-A',
	'-a',
	'-c',
	'-f',
	'-h',
	'-m',
	'-r',
	'-t',
];

export const touchTestSuiteSpec: ISuiteSpec = {
	name: 'touch',
	completionSpecs: touchSpec,
	availableCommands: 'touch',
	testSpecs: [
		// Empty input
		{ input: '|', expectedCompletions: ['touch'], expectedResourceRequests: { type: 'both', cwd: testPaths.cwd } },

		// Typing the command
		{ input: 't|', expectedCompletions: ['touch'], expectedResourceRequests: { type: 'both', cwd: testPaths.cwd } },
		{ input: 'touch|', expectedCompletions: ['touch'], expectedResourceRequests: { type: 'both', cwd: testPaths.cwd } },

		// Basic options
		{ input: 'touch |', expectedCompletions: allOptions, expectedResourceRequests: { type: 'folders', cwd: testPaths.cwd } },
	]
};
