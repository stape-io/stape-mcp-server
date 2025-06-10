export type McpAgentPropsModel = {
  apiKey: string;
};

export type McpAgentToolParamsModel = {
  props: McpAgentPropsModel;
  env: Env;
};
