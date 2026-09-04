# Stape MCP Server

This project implements an **MCP (Model Context Protocol) server** for the **Stape** platform.

## Table of Contents

- [API Documentation](#api-documentation)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [EU Endpoint Support](#eu-endpoint-support)
- [Available tools](#available-tools)
- [Troubleshooting](#troubleshooting)
- [Open Source](#open-source)

## API Documentation

The server wraps the Stape REST API. Full endpoint reference:
- Global: https://api.app.stape.io/api/doc
- EU: https://api.app.eu.stape.io/api/doc

## Prerequisites
- Node.js (v18 or higher)

## Installation

The Stape MCP Server is a remote, HTTP-based MCP endpoint at `https://mcp.stape.ai/mcp`. Most clients reach it through [`mcp-remote`](https://github.com/geelen/mcp-remote#readme), a small bridge that lets stdio-only clients talk to a remote HTTP MCP server; a few clients (VS Code, Cursor, Antigravity) speak HTTP directly.

Get a Stape API key from your Stape account and use it instead of `${your_stape_api_key}` below ([learn how](https://stape.io/helpdesk/documentation/stape-api#how-to-use-stape-api)). Restart the client after changing its config.

Using the Stape EU environment? Every config below needs one extra header — see [EU Endpoint Support](#eu-endpoint-support).

### Claude Desktop

Add this to your `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "stape-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.stape.ai/mcp",
        "--header",
        "Authorization: ${your_stape_api_key}"
      ]
    }
  }
}
```

### Claude Code

```bash
claude mcp add --transport http stape-mcp-server https://mcp.stape.ai/mcp \
  --header "Authorization: ${your_stape_api_key}"
```

This writes the same server entry into `.mcp.json` / your Claude Code MCP config. Run `/mcp` inside Claude Code to confirm it connected.

### VS Code

VS Code's MCP client supports HTTP servers natively, no `mcp-remote` needed. Add this to `.vscode/mcp.json`:

```json
{
  "servers": {
    "stape-mcp-server": {
      "type": "http",
      "url": "https://mcp.stape.ai/mcp",
      "headers": {
        "Authorization": "${your_stape_api_key}"
      }
    }
  }
}
```

### Copilot CLI

```bash
copilot mcp add --transport http stape-mcp-server https://mcp.stape.ai/mcp \
  --header "Authorization: ${your_stape_api_key}"
```

This writes the server entry into `~/.copilot/mcp-config.json`. See [GitHub's docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers#using-the-copilot-mcp-add-subcommand) for more on the `copilot mcp add` subcommand.

### GitHub Copilot

GitHub Copilot Chat in VS Code uses VS Code's own MCP client, so it reads the same `.vscode/mcp.json` file — see [VS Code](#vs-code) above. No separate configuration is needed.

### Cursor

Cursor speaks HTTP directly too, no `mcp-remote` needed. Add this to `.cursor/mcp.json` (project-level) or `~/.cursor/mcp.json` (global — Settings → MCP → Add new global MCP server):

```json
{
  "mcpServers": {
    "stape-mcp-server": {
      "url": "https://mcp.stape.ai/mcp",
      "headers": {
        "Authorization": "${your_stape_api_key}"
      }
    }
  }
}
```

### Antigravity

Antigravity also speaks HTTP directly, using `serverUrl` instead of `url`. Add this to `~/.gemini/config/mcp_config.json` (global) or `.agents/mcp_config.json` (workspace-local) — accessible from the editor's agent panel via **… → MCP Servers → Manage MCP Servers → View raw config**:

```json
{
  "mcpServers": {
    "stape-mcp-server": {
      "serverUrl": "https://mcp.stape.ai/mcp",
      "headers": {
        "Authorization": "${your_stape_api_key}"
      }
    }
  }
}
```

### ChatGPT

1. In ChatGPT, enable Developer mode: Settings → Apps & Connectors → Advanced settings → Developer mode.
2. Go to Settings → Connectors → Create, and set the server URL to `https://mcp.stape.ai/mcp`.
3. Authenticate with your Stape API key. ChatGPT's connector UI is OAuth-first and support for a raw `Authorization` header varies by rollout — if there's no field for it, use one of the other clients above instead.

### Other MCP clients

Any other MCP-compatible client that expects a stdio-style `command`/`args` config can use the same `mcp-remote` block:

```json
{
  "mcpServers": {
    "stape-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.stape.ai/mcp",
        "--header",
        "Authorization: ${your_stape_api_key}"
      ]
    }
  }
}
```

## EU Endpoint Support

If you are using Stape EU environment, you need to provide an additional header `X-Stape-Region: EU`.

```json
{
  "mcpServers": {
    "stape-mcp-server-eu": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.stape.ai/mcp",
        "--header",
        "Authorization: ${your_stape_api_key}",
        "--header",
        "X-Stape-Region: EU"
      ]
    }
  }
}
```

## Available tools

Each tool takes an `action` parameter selecting the operation (`list`, `get`, `create`, `update`, `delete`, …). Destructive actions additionally require `confirm: true`.

| Area | Tools |
| --- | --- |
| Containers | `stape_container_crud`, `stape_container_lifecycle`, `stape_container_domains`, `stape_container_schedules`, `stape_container_power_ups`, `stape_container_proxy_files`, `stape_container_connections`, `stape_container_resources` |
| Monitoring & logs | `stape_container_monitoring`, `stape_container_monitoring_logs`, `stape_container_logs`, `stape_container_analytics`, `stape_container_statistics` |
| Billing | `stape_billing`, `stape_consolidated_invoicing`, `stape_invoices`, `stape_payment_links`, `stape_subscriptions`, `stape_container_subscription`, `stape_container_paddle` |
| Account & access | `stape_account`, `stape_users`, `stape_user_api_keys`, `stape_company`, `stape_share_access` |
| Partners | `stape_partner`, `stape_partner_payouts` |
| Stape Score | `stape_score_report` — scan a website's tracking setup with Stape Score (create a scan, fetch results) |
| Reference data | `stape_container_resource`, `stape_domains_resource`, `stape_gateway_resource`, `stape_logs_resource`, `stape_monitoring_resource`, `stape_billing_resource`, `stape_partner_resource`, `stape_products`, `stape_calculator` |

## Troubleshooting

**MCP Server Name Length Limit**

Some MCP clients (like Cursor AI) have a 60-character limit for the combined MCP server name + tool name length. If you use a longer server name in your configuration (e.g., `stape-mcp-server-your-additional-long-name`), some tools may be filtered out.

To avoid this issue:
- Use shorter server names in your MCP configuration (e.g., `stape-mcp-server`)

**Clearing MCP Cache**

[mcp-remote](https://github.com/geelen/mcp-remote#readme) stores all the credential information inside ~/.mcp-auth (or wherever your MCP_REMOTE_CONFIG_DIR points to). If you're having persistent issues, clear it and restart your MCP client:

```
rm -rf ~/.mcp-auth
```

## Open Source

The **Stape MCP Server** is developed and maintained by [Stape Team](https://stape.io/) under the Apache 2.0 license.
