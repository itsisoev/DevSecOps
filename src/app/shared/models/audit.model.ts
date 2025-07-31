export interface AuditResult {
  name: string;
  version: string;
  needsUpdate: boolean;
  latestVersion?: string;
  status: 'safe' | 'updateRecommended' | 'vulnerable';
  size?: number;
  sizeLabel?: 'small' | 'medium' | 'large';
}

export interface AuditResponse {
  hash: string;
  message: string;
  results: AuditResult[];
}
