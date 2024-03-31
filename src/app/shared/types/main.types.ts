export interface User {
  message: string;
  id: string;
  accessToken: string;
  username: string;
  email: string;
  role: string;
  profilePicture: string;
  tokens: string | null;
  enabled: boolean;
  deleted: boolean;
}

export interface ApiSignal<T> {
  data: T | null;
  pending: boolean;
  error: any;
}

export interface SurveyTemplate {
  active: boolean;
  deactivated: boolean;
  logo: {
    style: object;
    url: string;
  };
  id: string;
  surveyTitle: {
    title: {
      titleName: string;
      style: object;
    };
    description: {
      detail: string;
      style: object;
    };
  };
}

// TODO: delete this interface
export interface Template {
  active: boolean;
  deactivated: boolean;
  url: string;
  title: string;
  description: string;
}
