// src/nodes/constants.ts
export enum WorkflowNodeType {
  Start = 'start',
  End = 'end',
  
  // CI/CD Pipeline Nodes
  GitClone = 'git-clone',
  BuildImage = 'build-image',
  RunTests = 'run-tests',
  Deploy = 'deploy',
  SecurityScan = 'security-scan',
  QualityGate = 'quality-gate',
  Notification = 'notification',
  ArtifactStore = 'artifact-store',
  EnvironmentSetup = 'environment-setup',
  DatabaseMigration = 'database-migration',
  
  // Control Flow
  Condition = 'condition',
  Loop = 'loop',
  BlockStart = 'block-start',
  BlockEnd = 'block-end',
  Comment = 'comment',
}