import type { MappedCriterion } from "../../entities/exam";

export const criterionIsValid = (criterion: MappedCriterion) => {
  Object.keys(criterion.criteria).forEach(key => {
    if (criterion.criteria[key] === null) return false
  })
  return true
}