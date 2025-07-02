import { containerPaddleActions } from "./containerPaddleActions";
import { containerResourcesActions } from "./containerResourcesActions";
import { containerStatisticsActions } from "./containerStatisticsActions";
import { containerSubscriptionActions } from "./containerSubscriptionActions";

export const containersResourcesTools = [
  containerStatisticsActions,
  containerSubscriptionActions,
  containerPaddleActions,
  containerResourcesActions,
];
