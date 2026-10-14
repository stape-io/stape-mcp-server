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

The Stape MCP Server is a remote, HTTP-based MCP endpoint at `https://mcp.stape.io/mcp`. Clients that speak HTTP directly (Claude Code, VS Code, Copilot CLI, Cursor, Antigravity, Lovable, and Claude Desktop's custom connectors where request headers are available) connect to it as is; stdio-only clients reach it through [`mcp-remote`](https://github.com/geelen/mcp-remote#readme), a small bridge to remote HTTP MCP servers.

> A legacy `/sse` endpoint also exists for backward compatibility with older SSE-based MCP clients. It isn't part of any config below — use `/mcp` for new integrations.

Get a Stape API key from your Stape account and use it instead of `${your_stape_api_key}` below ([learn how](https://stape.io/helpdesk/documentation/stape-api#how-to-use-stape-api)). Restart the client after changing its config.

Using the Stape EU environment? Each client below ends with the one change EU accounts need — see [EU Endpoint Support](#eu-endpoint-support) for why.

### Claude Desktop

<details>
<summary>⬇️ Click to expand ⬇️</summary>

**Custom connector (HTTP direct).** If your **Add custom connector** dialog has a **Request headers** section (in beta, [not available to every organization yet](https://claude.com/docs/connectors/custom/add-unlisted#authenticate-with-request-headers)):

1. Go to **Customize → Connectors → Add custom connector**. On Team and Enterprise plans, an Owner adds it under **Organization settings → Connectors** instead, and every member then uses the key the Owner entered: everyone in the organization acts as that one Stape account, including its write and delete tools, so only do this when that's intended.
2. Set the URL to `https://mcp.stape.io/mcp` and **Authentication** to **No sign-in**.
3. Under **Request headers**, add `authorization` with your Stape API key as the value, mark it **Required**, and select **Add**.

The connector also works on claude.ai. EU accounts use `https://mcp.stape.io/mcp?region=eu` as the URL.

**`mcp-remote`.** Without **Request headers**, add this to your `claude_desktop_config.json` (Settings → Developer → Edit Config):

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

EU accounts: add `"--header", "X-Stape-Region: EU"` to `args`.

</details>

### Claude Code

<details>
<summary>⬇️ Click to expand ⬇️</summary>

```bash
claude mcp add --transport http stape-mcp-server https://mcp.stape.io/mcp \
  --header "Authorization: ${your_stape_api_key}"
```

This adds the server to the current project only. Add `--scope user` to use it in every project, or `--scope project` to write it to the project's `.mcp.json` (avoid that one if the file is committed, since it holds your key). Run `claude mcp list` or `/mcp` inside Claude Code to confirm it connected.

EU accounts: add `--header "X-Stape-Region: EU"`.

</details>

### VS Code

<details>
<summary>⬇️ Click to expand ⬇️</summary>

VS Code's MCP client supports HTTP servers natively, no `mcp-remote` needed. Add this to `.vscode/mcp.json` (this workspace) or to the file **MCP: Open User Configuration** opens (every workspace). VS Code asks for the API key the first time the server starts and stores it, so the key never lands in the file:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "stape-api-key",
      "description": "Stape API key",
      "password": true
    }
  ],
  "servers": {
    "stape-mcp-server": {
      "type": "http",
      "url": "https://mcp.stape.io/mcp",
      "headers": {
        "Authorization": "${input:stape-api-key}"
      }
    }
  }
}
```

EU accounts: add `"X-Stape-Region": "EU"` to `headers`.

</details>

### Copilot CLI

<details>
<summary>⬇️ Click to expand ⬇️</summary>

```bash
copilot mcp add --transport http stape-mcp-server https://mcp.stape.io/mcp \
  --header "Authorization: ${your_stape_api_key}"
```

This writes the server entry into `~/.copilot/mcp-config.json`, and it's available right away. Run `copilot mcp get stape-mcp-server` to confirm it connected. Inside an interactive session, `/mcp add` does the same through a form. See [GitHub's docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers#using-the-copilot-mcp-add-subcommand) for more.

EU accounts: add `--header "X-Stape-Region: EU"`.

</details>

### GitHub Copilot

<details>
<summary>⬇️ Click to expand ⬇️</summary>

GitHub Copilot Chat in VS Code uses VS Code's own MCP client, so it reads the same `.vscode/mcp.json` file — see [VS Code](#vs-code) above, including its EU change. No separate configuration is needed.

</details>

### Cursor

<details>
<summary>⬇️ Click to expand ⬇️</summary>

Cursor speaks HTTP directly too, no `mcp-remote` needed. Add this to `.cursor/mcp.json` (this project) or `~/.cursor/mcp.json` (every project):

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

To keep the key out of the file, set `"Authorization": "${env:STAPE_API_KEY}"` and export `STAPE_API_KEY` in your shell profile. Manage the server from **Customize** in Cursor's sidebar.

EU accounts: add `"X-Stape-Region": "EU"` to `headers`.

</details>

### Antigravity

<details>
<summary>⬇️ Click to expand ⬇️</summary>

Antigravity also speaks HTTP directly, using `serverUrl` instead of `url`. Add this to `~/.gemini/config/mcp_config.json`, which the Antigravity editor and CLI share. In the editor, open it from the agent panel via **… → MCP Servers → Manage MCP Servers → View raw config**:

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

EU accounts: add `"X-Stape-Region": "EU"` to `headers`.

</details>

### ChatGPT

<details>
<summary>⬇️ Click to expand ⬇️</summary>

ChatGPT can't connect to the Stape MCP Server yet. Its custom MCP servers (**Plugins → + → Add custom MCP server**) accept only OAuth or no authentication ([OpenAI's docs](https://developers.openai.com/api/docs/guides/custom-mcp-server)), and the Stape MCP Server authenticates with an API key. Use one of the other clients in the meantime.

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

If your client supports remote HTTP MCP servers with custom headers, point it at `https://mcp.stape.io/mcp` with an `Authorization` header holding your Stape API key, as in the [Cursor](#cursor) config. Otherwise, use `mcp-remote`:

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

EU accounts: send the `X-Stape-Region: EU` header (with `mcp-remote`, add `"--header", "X-Stape-Region: EU"` to `args`), or use `https://mcp.stape.io/mcp?region=eu` if the client takes only a URL and a key.

</details>

## EU Endpoint Support

If your Stape account is on the EU environment, the server needs to know so it calls the EU API. Each client in [Installation](#installation) ends with the change it needs, which is **one** of these:

| Option | Use it when |
|---|---|
| `X-Stape-Region: EU` header | Your client lets you set headers (Claude Desktop with `mcp-remote`, Claude Code, VS Code, Cursor, Antigravity, Copilot CLI) |
| `?region=eu` on the server URL, i.e. `https://mcp.stape.io/mcp?region=eu` | Your client takes only a URL and a key (Lovable, Claude Desktop custom connectors) |

If both are present, the header wins. Without either, requests go to the global API and an EU API key is rejected with `401 Unauthorized`.

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
