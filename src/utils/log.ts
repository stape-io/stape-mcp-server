export function log(message: string, ...rest: unknown[]): void {
  if (!process.env.NO_COLOR) {
    message = message
      .replace(/✅/g, "SUCCESS:")
      .replace(/❌/g, "ERROR:")
      .replace(/ℹ️/g, "INFO:")
      .replace(/\u2139\ufe0f/g, "INFO:");
  }
  console.log(message, ...rest);
}
