/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Caret Team. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DomActivityTracker } from './domActivityTracker.js';
import { userActivityRegistry } from '../common/userActivityRegistry.js';

userActivityRegistry.add(DomActivityTracker);
