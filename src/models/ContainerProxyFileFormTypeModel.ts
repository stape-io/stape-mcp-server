export interface ContainerProxyFileFormTypeModel {
  originalFileUrl: string;
  customPath: string;
  cacheMaxAge: ContainerProxyFileCacheMaxAge;
}

export type ContainerProxyFileCacheMaxAge =
  | -1
  | 120
  | 300
  | 1200
  | 1800
  | 3600
  | 7200
  | 10800
  | 14400
  | 18000
  | 28800
  | 43200
  | 57600
  | 72000
  | 86400
  | 172800
  | 259200
  | 345600
  | 432000
  | 691200
  | 1382400
  | 2073600
  | 2592000
  | 5184000
  | 15552000
  | 31536000;

export interface ContainerProxyFile {
  identifier: string;
  originalFileUrl: string;
  customPath: string;
  cacheMaxAge: ContainerProxyFileCacheMaxAge;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface ContainerProxyFilesPutRequest {
  containerProxyFiles: ContainerProxyFileFormTypeModel[];
}
