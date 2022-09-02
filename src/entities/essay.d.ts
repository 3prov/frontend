import { DateString, WeekFormat } from "./common"

export type Origin = {
  body: string,
  author: string,
  author_description: string
}
export type Essay = {
  body: string,
  created_at?: DateString
}
export type Problem = {
  problem: string,
  authorTake: string
}
export type Task = Origin & WeekFormat
export type TaskKey = {
  range_of_problems: string,
  authors_position: string
}