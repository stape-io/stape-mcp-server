export interface UpcomingInvoiceModel {
  plan: string;
  period: string;
  total: number;
  isTrial: boolean;
  trialDays: number;
  subtotal: number;
  totalDue: number;
}
