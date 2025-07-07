// src/nodes/deploy/index.ts
import { nanoid } from 'nanoid';
import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import { FaCloudUploadAlt } from 'react-icons/fa';
const iconDeploy = FaCloudUploadAlt;

let index = 0;
export const DeployNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Deploy,
  info: {
    icon: iconDeploy,
    description: 'Deploy application to target environment.',
  },
  meta: {
    size: {
      width: 360,
      height: 340,
    },
  },
  onAdd() {
    return {
      id: `deploy_${nanoid(5)}`,
      type: 'deploy',
      data: {
        title: `Deploy ${++index}`,
        inputsValues: {
          environment: {
            type: 'constant',
            content: 'staging',
          },
          deploymentStrategy: {
            type: 'constant',
            content: 'rolling',
          },
          imageUrl: {
            type: 'ref',
            content: ['build_image_1', 'imageUrl'],
          },
          replicas: {
            type: 'constant',
            content: 3,
          },
          healthCheckPath: {
            type: 'constant',
            content: '/health',
          },
          configFiles: {
            type: 'constant',
            content: [],
          },
          secrets: {
            type: 'constant',
            content: [],
          },
        },
        inputs: {
          type: 'object',
          required: ['environment', 'imageUrl'],
          properties: {
            environment: {
              type: 'string',
              description: 'Target environment (dev/staging/prod)',
            },
            deploymentStrategy: {
              type: 'string',
              description: 'Deployment strategy (rolling/blue-green/canary)',
            },
            imageUrl: {
              type: 'string',
              description: 'Container image URL',
            },
            replicas: {
              type: 'number',
              description: 'Number of replicas',
            },
            healthCheckPath: {
              type: 'string',
              description: 'Health check endpoint',
            },
            configFiles: {
              type: 'array',
              description: 'Configuration files',
            },
            secrets: {
              type: 'array',
              description: 'Secret references',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            deploymentId: { type: 'string' },
            serviceUrl: { type: 'string' },
            status: { type: 'string' },
            deployedAt: { type: 'string' },
            rollbackId: { type: 'string' },
          },
        },
      },
    };
  },
};