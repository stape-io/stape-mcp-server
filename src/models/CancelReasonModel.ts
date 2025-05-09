export interface CancelReasonItem {
  type: string;
  label: string;
}

export interface CancelReasonModel {
  setup: CancelReasonItem[];
  cancel: CancelReasonItem[];
}
