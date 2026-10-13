# Stape MCP Server

This project implements an **MCP (Model Context Protocol) server** for the **Stape** platform.

## Table of Contents

- [API Documentation](#api-documentation)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [EU Endpoint Support](#eu-endpoint-support)
- [Available tools](#available-tools)
- [Troubleshooting](#troubleshooting)
- [Useful resources](#useful-resources)

## API Documentation

The server wraps the Stape REST API. Full endpoint reference:
- Global: https://api.app.stape.io/api/doc
- EU: https://api.app.eu.stape.io/api/doc

## Prerequisites
- Node.js (v20 or higher)

## Installation

The Stape MCP Server is a remote, HTTP-based MCP endpoint at `https://mcp.stape.io/mcp`. Most clients reach it through [`mcp-remote`](https://github.com/geelen/mcp-remote#readme), a small bridge that lets stdio-only clients talk to a remote HTTP MCP server; a few clients (VS Code, Cursor, Antigravity) speak HTTP directly.

> A legacy `/sse` endpoint also exists for backward compatibility with older SSE-based MCP clients. It isn't part of any config below — use `/mcp` for new integrations.

Get a Stape API key from your Stape account and use it instead of `${your_stape_api_key}` below ([learn how](https://stape.io/helpdesk/documentation/stape-api#how-to-use-stape-api)). Restart the client after changing its config.

Using the Stape EU environment? Every config below needs one extra header, or `?region=eu` on the URL for clients without custom headers — see [EU Endpoint Support](#eu-endpoint-support).

### Claude Desktop

<details>
<summary>⬇️ Click to expand ⬇️</summary>

Add this to your `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "stape-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.stape.io/mcp",
        "--header",
        "Authorization: ${your_stape_api_key}"
      ]
    }
  }
}
```

</details>

### Claude Code

<details>
<summary>⬇️ Click to expand ⬇️</summary>

```bash
claude mcp add --transport http stape-mcp-server https://mcp.stape.io/mcp \
  --header "Authorization: ${your_stape_api_key}"
```

This writes the same server entry into `.mcp.json` / your Claude Code MCP config. Run `/mcp` inside Claude Code to confirm it connected.

</details>

### VS Code

<details>
<summary>⬇️ Click to expand ⬇️</summary>

VS Code's MCP client supports HTTP servers natively, no `mcp-remote` needed. Add this to `.vscode/mcp.json`:

```json
{
  "servers": {
    "stape-mcp-server": {
      "type": "http",
      "url": "https://mcp.stape.io/mcp",
      "headers": {
        "Authorization": "${your_stape_api_key}"
      }
    }
  }
}
```

</details>

### Copilot CLI

<details>
<summary>⬇️ Click to expand ⬇️</summary>

```bash
copilot mcp add --transport http stape-mcp-server https://mcp.stape.io/mcp \
  --header "Authorization: ${your_stape_api_key}"
```

This writes the server entry into `~/.copilot/mcp-config.json`. See [GitHub's docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers#using-the-copilot-mcp-add-subcommand) for more on the `copilot mcp add` subcommand.

</details>

### GitHub Copilot

<details>
<summary>⬇️ Click to expand ⬇️</summary>

GitHub Copilot Chat in VS Code uses VS Code's own MCP client, so it reads the same `.vscode/mcp.json` file — see [VS Code](#vs-code) above. No separate configuration is needed.

</details>

### Cursor

<details>
<summary>⬇️ Click to expand ⬇️</summary>

Cursor speaks HTTP directly too, no `mcp-remote` needed. Add this to `.cursor/mcp.json` (project-level) or `~/.cursor/mcp.json` (global — Settings → MCP → Add new global MCP server):

```json
{
  "mcpServers": {
    "stape-mcp-server": {
      "url": "https://mcp.stape.io/mcp",
      "headers": {
        "Authorization": "${your_stape_api_key}"
      }
    }
  }
}
```

</details>

### Antigravity

<details>
<summary>⬇️ Click to expand ⬇️</summary>

Antigravity also speaks HTTP directly, using `serverUrl` instead of `url`. Add this to `~/.gemini/config/mcp_config.json` (global) or `.agents/mcp_config.json` (workspace-local) — accessible from the editor's agent panel via **… → MCP Servers → Manage MCP Servers → View raw config**:

```json
{
  "mcpServers": {
    "stape-mcp-server": {
      "serverUrl": "https://mcp.stape.io/mcp",
      "headers": {
        "Authorization": "${your_stape_api_key}"
      }
    }
  }
}
```

</details>

### ChatGPT

<details>
<summary>⬇️ Click to expand ⬇️</summary>

1. In ChatGPT, enable Developer mode: Settings → Apps & Connectors → Advanced settings → Developer mode.
2. Go to Settings → Connectors → Create, and set the server URL to `https://mcp.stape.io/mcp`.
3. Authenticate with your Stape API key. ChatGPT's connector UI is OAuth-first and support for a raw `Authorization` header varies by rollout — if there's no field for it, use one of the other clients above instead.

</details>

### Lovable

<details>
<summary>⬇️ Click to expand ⬇️</summary>

1. In Lovable, go to **Connectors**, select **+** in the top right, then choose **MCP server**.
2. Set **Server name** to `Stape` and **Server URL** to `https://mcp.stape.io/mcp`.
3. Under authentication, choose **Bearer token or API key** (not the default OAuth) and paste your Stape API key.
4. Select **Add server**.

Lovable can't send custom headers, so EU accounts use `https://mcp.stape.io/mcp?region=eu` as the server URL instead of the `X-Stape-Region` header. The connection is personal (teammates add their own) and works in the project chat and Chats, not in your published app. See [Lovable's docs](https://docs.lovable.dev/integrations/custom-mcp) for more.

</details>

### Other MCP clients

<details>
<summary>⬇️ Click to expand ⬇️</summary>

Any other MCP-compatible client that expects a stdio-style `command`/`args` config can use the same `mcp-remote` block:

```json
{
  "mcpServers": {
    "stape-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.stape.io/mcp",
        "--header",
        "Authorization: ${your_stape_api_key}"
      ]
    }
  }
}
```

</details>

## EU Endpoint Support

If your Stape account is on the EU environment, the server needs to know so it calls the EU API. Take the config for your client from [Installation](#installation) and add **one** of the following:

| Option | Use it when |
|---|---|
| `X-Stape-Region: EU` header | Your client lets you set headers (Claude Desktop, Claude Code, VS Code, Cursor, Antigravity, Copilot CLI, `mcp-remote`) |
| `?region=eu` on the server URL | Your client only takes a URL and a key (Lovable, ChatGPT) |

If both are present, the header wins. Without either, requests go to the global API and an EU API key is rejected with `401 Unauthorized`.

### Header

Add it next to `Authorization`, in the same format your config already uses:

- **`mcp-remote` configs** (Claude Desktop, other clients): two more entries in `args`:
  ```json
  "--header",
  "X-Stape-Region: EU"
  ```
- **JSON `headers` configs** (VS Code, Cursor, Antigravity): one more key:
  ```json
  "headers": {
    "Authorization": "${your_stape_api_key}",
    "X-Stape-Region": "EU"
  }
  ```
- **CLI** (Claude Code, Copilot CLI): one more flag:
  ```bash
  --header "X-Stape-Region: EU"
  ```

### URL

Use this as the server URL instead of `https://mcp.stape.io/mcp`:

```
https://mcp.stape.io/mcp?region=eu
```

## Available tools

Each tool takes an `action` parameter selecting the operation (`list`, `get`, `create`, `update`, `delete`, …). Destructive actions additionally require `confirm: true`.

Tools that mix reads with destructive or state-changing actions are split into a
`_read` tool (safe, read-only actions) and a `_write` tool (create/update/delete
actions); tools that were already all-read or already carried non-destructive
writes only are left as a single tool. The exceptions are
`stape_container_proxy_files` and `stape_container_schedules`: their `update`
replaces the whole collection (omitted entries are removed);
`stape_container_power_ups`: its `proxy_files` and `schedule` updates do the
same; and `stape_container_subscription`: it can transfer a container to a new
owner or cancel its subscription. All four are annotated
`destructiveHint: true` and not yet split.

| Area | Tools |
| --- | --- |
| Containers | `stape_container_read`, `stape_container_write`, `stape_container_lifecycle`, `stape_container_domains_read`, `stape_container_domains_write`, `stape_container_schedules`, `stape_container_power_ups`, `stape_container_proxy_files`, `stape_container_connections_read`, `stape_container_connections_write`, `stape_container_resources` |
| Monitoring & logs | `stape_container_monitoring_read`, `stape_container_monitoring_write`, `stape_container_monitoring_logs`, `stape_container_logs_read`, `stape_container_logs_write`, `stape_container_analytics`, `stape_container_statistics` |
| Billing | `stape_billing`, `stape_consolidated_invoicing_read`, `stape_consolidated_invoicing_write`, `stape_invoices`, `stape_payment_links_read`, `stape_payment_links_write`, `stape_subscriptions`, `stape_container_subscription`, `stape_container_paddle` |
| Account & access | `stape_account_read`, `stape_account_write`, `stape_users_read`, `stape_users_write`, `stape_user_api_keys_read`, `stape_user_api_keys_write`, `stape_company_read`, `stape_company_write`, `stape_share_access_read`, `stape_share_access_write` |
| Partners | `stape_partner`, `stape_partner_payouts_read`, `stape_partner_payouts_write` |
| Stape Score | `stape_score_report` — scan a website's tracking setup with Stape Score (create a scan, fetch results) |
| Reference data | `stape_container_resource`, `stape_domains_resource`, `stape_gateway_resource`, `stape_logs_resource`, `stape_monitoring_resource`, `stape_billing_resource`, `stape_partner_resource`, `stape_products`, `stape_calculator` |

## Troubleshooting

**MCP Server Name Length Limit**

Some MCP clients (like Cursor AI) have a 60-character limit for the combined MCP server name + tool name length. If you use a longer server name in your configuration (e.g., `stape-mcp-server-your-additional-long-name`), some tools may be filtered out.

To avoid this issue:
- Use shorter server names in your MCP configuration (e.g., `stape-mcp-server`)

**Clearing MCP Cache**

[mcp-remote](https://github.com/geelen/mcp-remote#readme) stores all the credential information inside `~/.mcp-auth` (or wherever your `MCP_REMOTE_CONFIG_DIR` points to). If you're having persistent issues, clear it and restart your MCP client:

```
rm -rf ~/.mcp-auth
```

## Useful resources

- [Step-by-step guide: Stape MCP Server configuration](https://stape.io/blog/stape-mcp-server-configuration)
