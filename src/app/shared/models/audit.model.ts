export type AuditResult = {
  name: string;
  version: string;
  needsUpdate: boolean;
  latestVersion?: string;
  status: 'safe' | 'updateRecommended' | 'vulnerable';
};

export interface AuditResponse {
  hash: string;
  message: string;
  results: AuditResult[];
}
