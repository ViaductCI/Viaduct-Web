/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '../typings';
import { StartNodeRegistry } from './start';
import { LoopNodeRegistry } from './loop';
import { EndNodeRegistry } from './end';
import { ConditionNodeRegistry } from './condition';
import { CommentNodeRegistry } from './comment';
import { BlockStartNodeRegistry } from './block-start';
import { BlockEndNodeRegistry } from './block-end';
import { ArtifactStoreNodeRegistry } from './artifact-store';
import { BuildImageNodeRegistry } from './build-image';
import { DeployNodeRegistry } from './deploy';
import { GitCloneNodeRegistry } from './git-clone';
import { NotificationNodeRegistry } from './notification';
import { SecurityScanNodeRegistry } from './security-scan';
export { WorkflowNodeType } from './constants';

export const nodeRegistries: FlowNodeRegistry[] = [
  ConditionNodeRegistry,
  StartNodeRegistry,
  EndNodeRegistry,
  LoopNodeRegistry,
  CommentNodeRegistry,
  BlockStartNodeRegistry,
  BlockEndNodeRegistry,
  // CI/CD Nodes
  ArtifactStoreNodeRegistry,
  BuildImageNodeRegistry,
  DeployNodeRegistry,
  GitCloneNodeRegistry,
  NotificationNodeRegistry,
  SecurityScanNodeRegistry,
];