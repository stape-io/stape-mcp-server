export interface CustomDomainDnsRecordType {
  type: string;
  label: string;
}

export interface CustomDomainDnsRecordModel {
  type: CustomDomainDnsRecordType;
  host: string;
  domain: string;
  value: string;
}
