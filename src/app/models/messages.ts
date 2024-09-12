export class Message {
  message!: string;
  type?: MessageTypes;
}

export enum MessageTypes {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}
