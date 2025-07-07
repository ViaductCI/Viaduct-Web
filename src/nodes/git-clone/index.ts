// src/nodes/git-clone/index.ts
import { nanoid } from 'nanoid';
import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import { FaGitAlt } from 'react-icons/fa';
const iconGit = FaGitAlt;

let index = 0;
export const GitCloneNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.GitClone,
  info: {
    icon: iconGit,
    description: 'Clone a Git repository and checkout a specific branch or commit.',
  },
  meta: {
    size: {
      width: 360,
      height: 280,
    },
  },
  onAdd() {
    return {
      id: `git_clone_${nanoid(5)}`,
      type: 'git-clone',
      data: {
        title: `Git Clone ${++index}`,
        inputsValues: {
          repository: {
            type: 'constant',
            content: 'https://github.com/user/repo.git',
          },
          branch: {
            type: 'constant',
            content: 'main',
          },
          credentials: {
            type: 'constant',
            content: '',
          },
          depth: {
            type: 'constant',
            content: 1,
          },
          submodules: {
            type: 'constant',
            content: false,
          },
        },
        inputs: {
          type: 'object',
          required: ['repository', 'branch'],
          properties: {
            repository: {
              type: 'string',
              description: 'Git repository URL',
            },
            branch: {
              type: 'string',
              description: 'Branch or tag to checkout',
            },
            credentials: {
              type: 'string',
              description: 'Git credentials (token/SSH key)',
            },
            depth: {
              type: 'number',
              description: 'Clone depth (0 for full history)',
            },
            submodules: {
              type: 'boolean',
              description: 'Initialize submodules',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            workspaceId: { type: 'string' },
            commitHash: { type: 'string' },
            branch: { type: 'string' },
            clonePath: { type: 'string' },
          },
        },
      },
    };
  },
};