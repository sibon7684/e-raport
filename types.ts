export interface Student {
  nisn: string;
  name: string;
  className: string;
  semester: string;
  academicYear: string;
  reportLink: string; // URL to the PDF on Google Drive
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
