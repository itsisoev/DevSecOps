export interface INotification {
  id: number;
  type: string;
  message: string;
  repo?: string;
  createdAt: string;
  read: boolean;
}
