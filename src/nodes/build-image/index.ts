// src/nodes/build-image/index.ts
import { nanoid } from 'nanoid';
import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import { FaDocker } from 'react-icons/fa';
const iconDocker = FaDocker;

let index = 0;
export const BuildImageNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.BuildImage,
  info: {
    icon: iconDocker,
    description: 'Build a Docker image from source code and push to registry.',
  },
  meta: {
    size: {
      width: 360,
      height: 320,
    },
  },
  onAdd() {
    return {
      id: `build_image_${nanoid(5)}`,
      type: 'build-image',
      data: {
        title: `Build Image ${++index}`,
        inputsValues: {
          dockerfilePath: {
            type: 'constant',
            content: './Dockerfile',
          },
          imageName: {
            type: 'constant',
            content: 'my-app',
          },
          imageTag: {
            type: 'ref',
            content: ['git_clone_1', 'commitHash'],
          },
          registry: {
            type: 'constant',
            content: 'docker.io',
          },
          buildArgs: {
            type: 'constant',
            content: {},
          },
          platform: {
            type: 'constant',
            content: 'linux/amd64',
          },
        },
        inputs: {
          type: 'object',
          required: ['dockerfilePath', 'imageName', 'imageTag'],
          properties: {
            dockerfilePath: {
              type: 'string',
              description: 'Path to Dockerfile',
            },
            imageName: {
              type: 'string',
              description: 'Docker image name',
            },
            imageTag: {
              type: 'string',
              description: 'Image tag/version',
            },
            registry: {
              type: 'string',
              description: 'Docker registry URL',
            },
            buildArgs: {
              type: 'object',
              description: 'Build arguments',
            },
            platform: {
              type: 'string',
              description: 'Target platform',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            imageUrl: { type: 'string' },
            imageDigest: { type: 'string' },
            imageSize: { type: 'number' },
            buildDuration: { type: 'number' },
          },
        },
      },
    };
  },
};