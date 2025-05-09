export interface AccountModel {
  avatar: string;
  billingProvider: string;
  createdAt: string; // ISO date
  hasAcademyUserReference: boolean;
  hasPassword: boolean;
  id: number;
  identifier: string;
  nameFirst: string;
  nameLast: string;
  note: string;
  showAgencyBanner: boolean;
  updatedAt: string; // ISO date
  username: string;
  active: boolean;
  consentEmailMarketing: boolean;
  twoFactorAuthenticationEnabled: boolean;
  partner: string;
  partnerApproved: boolean;
  partnerDebt: number;
  partnerRequested: boolean;
  registrationSource: string;
  subAccountPermission: string;
  authMethod: string;
  accountType: string;
}
