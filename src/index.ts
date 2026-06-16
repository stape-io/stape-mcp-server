import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { Hono } from "hono";
import { McpAgentPropsModel } from "./models/McpAgentModel";
import { tools } from "./tools";
import { getPackageVersion } from "./utils";

const app = new Hono<{
  Bindings: Env;
}>();

type State = null;

export class StapeMCPServer extends McpAgent<Env, State, McpAgentPropsModel> {
  server = new McpServer({
    name: "stape-mcp-server",
    version: getPackageVersion(),
    websiteUrl: "https://github.com/stape-io/stape-mcp-server",
  });

  async init() {
    tools.forEach((register) => {
      // @ts-ignore
      register(this.server, { props: this.props, env: this.env });
    });
  }
}

app.mount(
  "/sse",
  (req, env, ctx) => {
    const apiKey = req.headers.get("authorization");

    if (!apiKey) {
      return new Response("Unauthorized", { status: 401 });
    }

    const regionHeader = req.headers.get("X-Stape-Region");
    const isEU = regionHeader?.toUpperCase() === "EU";

    const apiBaseUrl = isEU ? env.API_APP_EU_URL : env.API_APP_GLOBAL_URL;

    ctx.props = {
      apiKey,
      apiBaseUrl,
    };

    return StapeMCPServer.serveSSE("/sse").fetch(req, env, ctx);
  },
  { replaceRequest: false },
);

app.mount(
  "/mcp",
  (req, env, ctx) => {
    const apiKey = req.headers.get("authorization");

    if (!apiKey) {
      return new Response("Unauthorized", { status: 401 });
    }

    const regionHeader = req.headers.get("X-Stape-Region");
    const isEU = regionHeader?.toUpperCase() === "EU";

    const apiBaseUrl = isEU ? env.API_APP_EU_URL : env.API_APP_GLOBAL_URL;

    ctx.props = {
      apiKey,
      apiBaseUrl,
    };

    return StapeMCPServer.serve("/mcp").fetch(req, env, ctx);
  },
  { replaceRequest: false },
);

export default app;
