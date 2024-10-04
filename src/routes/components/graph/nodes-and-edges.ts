import type { Node, Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: 'source',
    type: 'custom',
    data: { 
      name: 'Source Code', 
      job: 'Git Repository', 
      emoji: '📁',
      status: 'succeeded',
      runtime: '5s',
      lastRun: new Date().toISOString().split('T')[0]
    },
    position: { x: 0, y: 0 }
  },
  {
    id: 'build',
    type: 'custom',
    data: { 
      name: 'Build', 
      job: 'Compile and Package', 
      emoji: '🏗️',
      status: 'succeeded',
      runtime: '3m 20s',
      lastRun: new Date().toISOString().split('T')[0]
    },
    position: { x: 250, y: 0 }
  },
  {
    id: 'unit-test',
    type: 'custom',
    data: { 
      name: 'Unit Tests', 
      job: 'Run Unit Tests', 
      emoji: '🧪',
      status: 'succeeded',
      runtime: '2m 45s',
      lastRun: new Date().toISOString().split('T')[0]
    },
    position: { x: 500, y: -100 }
  },
  {
    id: 'integration-test',
    type: 'custom',
    data: { 
      name: 'Integration Tests', 
      job: 'Run Integration Tests', 
      emoji: '🔗',
      status: 'running',
      runtime: '5m 10s',
      lastRun: new Date().toISOString().split('T')[0]
    },
    position: { x: 500, y: 100 }
  },
  {
    id: 'code-analysis',
    type: 'custom',
    data: { 
      name: 'Code Analysis', 
      job: 'Static Code Analysis', 
      emoji: '🔍',
      status: 'succeeded',
      runtime: '1m 55s',
      lastRun: new Date().toISOString().split('T')[0]
    },
    position: { x: 750, y: -200 }
  },
  {
    id: 'security-scan',
    type: 'custom',
    data: { 
      name: 'Security Scan', 
      job: 'Vulnerability Scanning', 
      emoji: '🔒',
      status: 'pending',
      runtime: 'N/A',
      lastRun: new Date().toISOString().split('T')[0]
    },
    position: { x: 750, y: 0 }
  },
  {
    id: 'staging-deploy',
    type: 'custom',
    data: { 
      name: 'Staging Deploy', 
      job: 'Deploy to Staging', 
      emoji: '🚀',
      status: 'pending',
      runtime: 'N/A',
      lastRun: new Date().toISOString().split('T')[0]
    },
    position: { x: 1000, y: 0 }
  },
  {
    id: 'e2e-test',
    type: 'custom',
    data: { 
      name: 'E2E Tests', 
      job: 'Run E2E Tests', 
      emoji: '🔄',
      status: 'pending',
      runtime: 'N/A',
      lastRun: new Date().toISOString().split('T')[0]
    },
    position: { x: 1250, y: 0 }
  },
  {
    id: 'production-deploy',
    type: 'custom',
    data: { 
      name: 'Production Deploy', 
      job: 'Deploy to Production', 
      emoji: '🌐',
      status: 'pending',
      runtime: 'N/A',
      lastRun: new Date().toISOString().split('T')[0]
    },
    position: { x: 1500, y: 0 }
  }
];

export const initialEdges: Edge[] = [
  { id: 'e-source-build', source: 'source', target: 'build', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-build-unit', source: 'build', target: 'unit-test', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-build-integration', source: 'build', target: 'integration-test', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-unit-analysis', source: 'unit-test', target: 'code-analysis', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-unit-security', source: 'unit-test', target: 'security-scan', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-integration-security', source: 'integration-test', target: 'security-scan', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-analysis-staging', source: 'code-analysis', target: 'staging-deploy', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-security-staging', source: 'security-scan', target: 'staging-deploy', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-staging-e2e', source: 'staging-deploy', target: 'e2e-test', markerEnd: { type: 'arrowclosed' } },
  { id: 'e-e2e-production', source: 'e2e-test', target: 'production-deploy', markerEnd: { type: 'arrowclosed' } }
];