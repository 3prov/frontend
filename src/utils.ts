import { Criterion, MappedCriterion } from "./entities/exam"

export function mapCriterion(rawCriterion: Criterion): MappedCriterion {
  const obj: MappedCriterion = {
    criteria: {}
  }
  for (let block of rawCriterion.criterion) {
    for (let criteria of block.criterion) {
      obj.criteria[criteria.name] = criteria.value
    }
  }
  return obj
}

export function criterionIsDefault(criterion: MappedCriterion): boolean {
  for (let k of Object.values(criterion.criteria)) {
    if (k !== null || k !== undefined) return false
  }
  return true
}

export function criterionIsEqual(a: MappedCriterion, b: MappedCriterion): boolean {
  for (let k of Object.getOwnPropertyNames(a.criteria)) {
    if (k === 'id') continue
    if (!b.criteria[k] || b.criteria[k] !== a.criteria[k]) return false
  }
  return true
}

export function stringToText(raw: string, mapper: (t: string, idx?: number) => any) {
  return raw
            .split('\n') // split paragraphs
            .filter(e => e) // filter empty
            .map(mapper)
}

export function descriptionMaker(desc: string, mapper?: (t: [string, string]) => any) {
  const splited = desc.split(' ')
  const fullname = splited.slice(0, 3).join(' ')
  const other = splited.slice(3).join(' ')
  const result: [string, string] = [`*${fullname} `, other]

  if (mapper) {
    return mapper(result)
  }

  return result
}