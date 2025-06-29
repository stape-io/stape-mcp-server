import { billingResourceActions } from "./billingResourceActions";
import { containerResourceActions } from "./containerResourceActions";
import { domainsResourceActions } from "./domainsResourceActions";
import { gatewayResourceActions } from "./gatewayResourceActions";
import { logsResourceActions } from "./logsResourceActions";
import { monitoringResourceActions } from "./monitoringResourceActions";
import { partnerResourceActions } from "./partnerResourceActions";

export const resourceTools = [
  gatewayResourceActions,
  containerResourceActions,
  partnerResourceActions,
  billingResourceActions,
  monitoringResourceActions,
  logsResourceActions,
  domainsResourceActions,
];
