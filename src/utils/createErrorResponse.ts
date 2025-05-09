import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { HTTPResponseError } from "../models/HTTPResponseErrorModel";
import { ResponseErrorModel } from "../models/ResponseErrorModel";
import { log } from "./log";

export async function createErrorResponse(
  message: string,
  error: HTTPResponseError | Error | unknown,
): Promise<CallToolResult> {
  if (error instanceof HTTPResponseError) {
    let detailedMessage = `Stape API Error: ${error?.response?.status} - ${error?.response?.statusText}`;

    try {
      const errorBody: ResponseErrorModel = await error.response.json();

      if (errorBody?.body?.errors) {
        const validationMessages = Object.keys(
          errorBody?.body?.errors || {},
        ).reduce<string[]>((acc, field) => {
          acc.push(
            field
              ? `Field ${field} has error: ${errorBody?.body?.errors[field].join(". ")}.`
              : `Error: ${errorBody?.body?.errors[field].join(". ")}.`,
          );

          return acc;
        }, []);

        detailedMessage = `Stape API. ${validationMessages.join(" ")}`;
      }
    } catch {
      //
    }

    log("MCP Tool Error:", detailedMessage);

    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `${message}: ${detailedMessage}`,
        },
      ],
    };
  }

  return {
    isError: true,
    content: [
      {
        type: "text",
        text: `${message}: ${error instanceof Error ? error?.message : String(error)}`,
      },
    ],
  };
}
