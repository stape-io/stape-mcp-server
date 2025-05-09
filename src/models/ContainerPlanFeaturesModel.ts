export interface ContainerPlanFeaturesModel {
  botDetection: boolean;
  fileProxy: boolean;
  xmlToJson: boolean;
  requestDelay: boolean;
  schedule: boolean;
  cookieKeeper: boolean;
  connections: boolean;
  customCookies: boolean;
  logs: boolean;
  logDayLimit: number;
  multiDomains: boolean;
  multiDomainLimit: number;
  monitoring: boolean;
  monitoringLimit: number;
  requestLimit: number;
  servers: number;
  serverType: string;
  storage: boolean;
  directPubSub: boolean;
  anyDatabase: boolean;
  autoUpgrade: boolean;
  api: boolean;
  globalCdn: boolean; // default: true
  customDomain: boolean; // default: true
  customLoader: boolean; // default: true
  support: boolean; // default: true
}
