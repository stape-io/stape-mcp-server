import { accountTools } from "./account";
import { containerDomainsTools } from "./container-domains";
import { containerProxyFilesTools } from "./container-proxy-files";
import { containerSchedulesTools } from "./container-schedules";
import { containersTools } from "./containers";
import { containersAnalyticsTools } from "./containers-analytics";
import { containersResourcesTools } from "./containers-resources";
import { resourceTools } from "./resource";

export const tools = [
  ...containersTools,
  ...containerProxyFilesTools,
  ...containerDomainsTools,
  ...containerSchedulesTools,
  ...containersAnalyticsTools,
  ...containersResourcesTools,
  ...resourceTools,
  ...accountTools,
];
