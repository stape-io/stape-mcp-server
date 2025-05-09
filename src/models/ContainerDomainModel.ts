import { OptionModel } from "./OptionModel";

export interface ContainerDomainRecordTypeModel {
  type: OptionModel;
  host: string;
  value: string;
}

export interface ContainerDomainModel {
  status: OptionModel;
  error: OptionModel;
  records: ContainerDomainRecordTypeModel[];
  isBadDomain: boolean;
  sslCert: string;
  sslKey: string;
  connectionType: string;
  id: number;
  identifier: string;
  name: string;
  cdnHostnameId: string;
  verificationCount: number;
  cdnType: string;
  recordType: string;
  disableVerification: boolean;
  issuer: string;
}
