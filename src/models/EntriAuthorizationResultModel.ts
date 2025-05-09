export interface EntriAuthorizationDnsRecordModel {
  type: string;
  host: string;
  value: string;
  ttl: number;
}

export interface EntriAuthorizationResultModel {
  applicationId: string;
  token: string;
  prefilledDomain: string;
  dnsRecords: EntriAuthorizationDnsRecordModel[];
  userId: string;
}
