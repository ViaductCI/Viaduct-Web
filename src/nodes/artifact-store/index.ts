// src/nodes/artifact-store/index.ts
import { nanoid } from 'nanoid';
import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import { FaArchive } from 'react-icons/fa';
const iconArtifact = FaArchive;

let index = 0;
export const ArtifactStoreNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.ArtifactStore,
  info: {
    icon: iconArtifact,
    description: 'Store and manage build artifacts, test reports, and other files.',
  },
  meta: {
    size: {
      width: 360,
      height: 300,
    },
  },
  onAdd() {
    return {
      id: `artifact_store_${nanoid(5)}`,
      type: 'artifact-store',
      data: {
        title: `Artifact Store ${++index}`,
        inputsValues: {
          artifactType: {
            type: 'constant',
            content: 'build',
          },
          sourcePath: {
            type: 'constant',
            content: './dist',
          },
          artifactName: {
            type: 'constant',
            content: 'my-app-build',
          },
          retention: {
            type: 'constant',
            content: 30,
          },
          compression: {
            type: 'constant',
            content: true,
          },
          metadata: {
            type: 'constant',
            content: {},
          },
        },
        inputs: {
          type: 'object',
          required: ['artifactType', 'sourcePath', 'artifactName'],
          properties: {
            artifactType: {
              type: 'string',
              description: 'Type of artifact (build/test-report/logs/binary)',
            },
            sourcePath: {
              type: 'string',
              description: 'Source path to archive',
            },
            artifactName: {
              type: 'string',
              description: 'Name for the artifact',
            },
            retention: {
              type: 'number',
              description: 'Retention period in days',
            },
            compression: {
              type: 'boolean',
              description: 'Compress artifact',
            },
            metadata: {
              type: 'object',
              description: 'Additional metadata',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            artifactId: { type: 'string' },
            downloadUrl: { type: 'string' },
            size: { type: 'number' },
            checksum: { type: 'string' },
            expiresAt: { type: 'string' },
          },
        },
      },
    };
  },
};