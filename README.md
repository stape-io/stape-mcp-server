# Stape MCP Server

This project implements an **MCP (Model Context Protocol) server** for the **Stape** platform.

## Prerequisites
- Node.js (v18 or higher)

## Access the remote MCP server from Claude Desktop

Open Claude Desktop and navigate to Settings -> Developer -> Edit Config. This opens the configuration file that controls which MCP servers Claude can access.

Replace the content with the following configuration (make sure npx is installed on your machine). Get Stape API key from your Stape account and set it in the configuration file instead of ${your_stape_api_key}. Once you restart Claude Desktop.

```json
{
  "mcpServers": {
    "stape-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.stape.ai/sse",
        "--header",
        "Authorization: ${your_stape_api_key}"
      ]
    }
  }
}
```

### Troubleshooting

**MCP Server Name Length Limit**

Some MCP clients (like Cursor AI) have a 60-character limit for the combined MCP server name + tool name length. If you use a longer server name in your configuration (e.g., `stape-mcp-server-your-additional-long-name`), some tools may be filtered out.

To avoid this issue:
- Use shorter server names in your MCP configuration (e.g., `stape-mcp-server`)

**Clearing MCP Cache**

[mcp-remote](https://github.com/geelen/mcp-remote#readme) stores all the credential information inside ~/.mcp-auth (or wherever your MCP_REMOTE_CONFIG_DIR points to). If you're having persistent issues, try running:
You can run rm -rf ~/.mcp-auth to clear any locally stored state and tokens.
```
rm -rf ~/.mcp-auth
```
Then restarting your MCP client.

## Open Source

The **Stape MCP Server** is developed and maintained by [Stape Team](https://stape.io/) under the Apache 2.0 license.
