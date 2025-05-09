export interface WarningModel {
  preview: string;
  detail: string;
  type: string;
  action: {
    type: string;
    label: string;
    link: string;
  };
}
