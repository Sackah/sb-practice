export interface ApiSignal<T> {
  data: T | null;
  pending: boolean;
  error: any;
}

export interface SurveyTemplate {
  title: string;
  image: string;
  description: string;
}
