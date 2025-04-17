import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerContainerZonesTool } from "./container-zones";

export const tools: ((server: McpServer) => void)[] = [
  registerContainerZonesTool
];
