import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerContainerZonesTool } from "./container-zones";
import { registerContainersTool } from "./containers";

// Define a type for tool registration functions
export type ToolRegistrationFunction = (server: McpServer) => void;

// Export array of tool registration functions
export const tools: ToolRegistrationFunction[] = [
  registerContainerZonesTool,
  registerContainersTool,
];

// Re-export any types that consumers of this module might need
export * from "./container-zones";
export * from "./containers";
