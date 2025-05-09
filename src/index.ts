import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./tools";
import { getPackageVersion, loadEnv, log } from "./utils";

// Load environment variables first
loadEnv();

// Initialize the server
const server = new McpServer({
  name: "stape-mcp-server",
  version: getPackageVersion(),
  protocolVersion: "1.0",
  vendor: "stape-io",
  homepage: "https://github.com/stape-io/stape-mcp-server",
});

// Register all tools with proper error handling
tools.forEach((register) => {
  try {
    register(server);
  } catch (error) {
    log(`❌ Failed to register a tool: ${error}`);
  }
});

async function main(): Promise<void> {
  try {
    log("ℹ️ Starting MCP server with stdio transport...");
    const transport = new StdioServerTransport();
    await server.connect(transport);
    log("✅ MCP server started");

    // Graceful shutdown handling
    const shutdown = async function () {
      log("ℹ️ Shutting down MCP server...");
      try {
        await server.close();
        log("✅ MCP server stopped gracefully");
        process.exit(0);
      } catch (error) {
        log(`❌ Error during shutdown: ${error}`);
        process.exit(1);
      }
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    log(`❌ Error starting server: ${error}`);
    process.exit(1);
  }
}

// Start the server
main();
