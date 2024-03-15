export interface ApiSignal<T> {
  data: T | null;
  pending: boolean;
  error: any;
}
