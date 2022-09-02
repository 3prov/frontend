import { MappedCriterion } from "../../entities/exam";
import { createStorageWorker } from "../../packages/storage-worker";
import { mapCriterion } from "../../utils";
import initialCriterion from '../../assets/criterion.json'

const CriteriaWorker = createStorageWorker<MappedCriterion>('CRITERIA', (result) => result || mapCriterion(initialCriterion))

export default CriteriaWorker