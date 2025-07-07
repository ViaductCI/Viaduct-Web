// src/nodes/notification/index.ts
import { nanoid } from 'nanoid';
import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import { FaRegBell } from 'react-icons/fa';
const iconNotification = FaRegBell;

let index = 0;
export const NotificationNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Notification,
  info: {
    icon: iconNotification,
    description: 'Send notifications via email, Slack, or other channels.',
  },
  meta: {
    size: {
      width: 360,
      height: 320,
    },
  },
  onAdd() {
    return {
      id: `notification_${nanoid(5)}`,
      type: 'notification',
      data: {
        title: `Notification ${++index}`,
        inputsValues: {
          channel: {
            type: 'constant',
            content: 'slack',
          },
          recipients: {
            type: 'constant',
            content: ['#dev-team', 'dev@company.com'],
          },
          message: {
            type: 'constant',
            content: 'Deployment completed successfully! 🚀',
          },
          trigger: {
            type: 'constant',
            content: 'always',
          },
          includeMetadata: {
            type: 'constant',
            content: true,
          },
          template: {
            type: 'constant',
            content: 'deployment-success',
          },
        },
        inputs: {
          type: 'object',
          required: ['channel', 'recipients', 'message'],
          properties: {
            channel: {
              type: 'string',
              description: 'Notification channel (slack/email/teams/webhook)',
            },
            recipients: {
              type: 'array',
              description: 'List of recipients',
            },
            message: {
              type: 'string',
              description: 'Notification message',
              extra: {
                formComponent: 'prompt-editor',
              },
            },
            trigger: {
              type: 'string',
              description: 'When to send (always/success/failure)',
            },
            includeMetadata: {
              type: 'boolean',
              description: 'Include pipeline metadata',
            },
            template: {
              type: 'string',
              description: 'Message template to use',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            sent: { type: 'boolean' },
            messageId: { type: 'string' },
            timestamp: { type: 'string' },
            deliveryStatus: { type: 'string' },
          },
        },
      },
    };
  },
};