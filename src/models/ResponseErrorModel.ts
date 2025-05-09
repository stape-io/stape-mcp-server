export interface ResponseErrorModel {
  body?: { errors: Record<string, string[]> };
  error?: { code: number; message: string; description: string; error: string };
}
