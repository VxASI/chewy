#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const oldHeader = `/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/`;

const newHeader = `/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Caret Team. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/`;

// Find all source files
const sourceFiles = execSync('git ls-files "*.ts" "*.js"', { encoding: 'utf8' }).split('\n').filter(Boolean);

// Update headers
sourceFiles.forEach(file => {
	const filePath = path.join(process.cwd(), file);
	let content = fs.readFileSync(filePath, 'utf8');

	if (content.includes(oldHeader)) {
		content = content.replace(oldHeader, newHeader);
		fs.writeFileSync(filePath, content);
		console.log(`Updated header in ${file}`);
	}
});

console.log('Header update complete!');
