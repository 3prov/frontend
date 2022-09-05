export type Status = 'init' | 'edit' | 'sended'
export type Id = string | undefined
export enum NotificationTypes {
  SEND_ERR = "SEND_ERR_NOTIF",
  GET_ERR = "GET_ERR_NOTIF",
  SEND_DONE = "SEND_DONE_NOTIF",
  EDIT_DONE = "EDIT_DONE_NOTIF",
  TIME = "TIME_NOTIF",
  RATE_DONE = "RATE_DONE_NOTIF",
  RATE_ERR = "RATE_ERR_NOTIF",
  UNCAUT_ERR = "UNCAUT_ERR_NOTIF"
}
export type Notif = {
  id: number,
  type: NotificationTypes,
  payload?: string
}