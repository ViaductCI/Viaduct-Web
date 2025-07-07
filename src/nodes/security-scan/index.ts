// src/nodes/security-scan/index.ts
import { nanoid } from 'nanoid';
import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import { FaShieldAlt } from 'react-icons/fa';
const iconSecurity = FaShieldAlt;

let index = 0;
export const SecurityScanNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.SecurityScan,
  info: {
    icon: iconSecurity,
    description: 'Perform security vulnerability scanning on code and dependencies.',
  },
  meta: {
    size: {
      width: 360,
      height: 300,
    },
  },
  onAdd() {
    return {
      id: `security_scan_${nanoid(5)}`,
      type: 'security-scan',
      data: {
        title: `Security Scan ${++index}`,
        inputsValues: {
          scanType: {
            type: 'constant',
            content: 'sast',
          },
          scanTool: {
            type: 'constant',
            content: 'sonarqube',
          },
          severity: {
            type: 'constant',
            content: 'medium',
          },
          excludePatterns: {
            type: 'constant',
            content: ['**/node_modules/**', '**/vendor/**'],
          },
          failOnVulnerabilities: {
            type: 'constant',
            content: true,
          },
          generateReport: {
            type: 'constant',
            content: true,
          },
        },
        inputs: {
          type: 'object',
          required: ['scanType', 'scanTool'],
          properties: {
            scanType: {
              type: 'string',
              description: 'Type of scan (sast/dast/dependency/container)',
            },
            scanTool: {
              type: 'string',
              description: 'Security scanning tool',
            },
            severity: {
              type: 'string',
              description: 'Minimum severity level (low/medium/high/critical)',
            },
            excludePatterns: {
              type: 'array',
              description: 'File patterns to exclude from scan',
            },
            failOnVulnerabilities: {
              type: 'boolean',
              description: 'Fail pipeline on vulnerabilities',
            },
            generateReport: {
              type: 'boolean',
              description: 'Generate security report',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            vulnerabilities: { type: 'array' },
            riskScore: { type: 'number' },
            passed: { type: 'boolean' },
            reportUrl: { type: 'string' },
            scanDuration: { type: 'number' },
          },
        },
      },
    };
  },
};