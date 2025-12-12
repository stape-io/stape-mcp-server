export type McpAgentPropsModel = {
  apiKey: string;
  apiBaseUrl: string;
};

export type McpAgentToolParamsModel = {
  props: McpAgentPropsModel;
  env: Env;
};
