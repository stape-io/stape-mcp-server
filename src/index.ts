import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getPackageVersion, loadEnv, log } from "./utils";
import { tools } from "./tools";

loadEnv();

const server = new McpServer({
  name: "stape-mcp-server",
  version: getPackageVersion(),
  protocolVersion: "1.0",
  vendor: "stape-io",
  homepage: "https://github.com/stape-io/stape-mcp-server",
});

tools.forEach((register) => register(server));

async function main(): Promise<void> {
  try {
    log("Starting MCP server with stdio transport...");
    const transport = new StdioServerTransport();
    await server.connect(transport);
    log("✅ MCP server started");
  } catch (error) {
    log(`❌ Error starting server: ${error}`);
    process.exit(1);
  }
}

main();
