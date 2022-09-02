import { Sentence } from "../../entities/exam";
import { createStorageWorker } from "../../packages/storage-worker";

const SentencesWorker = createStorageWorker<Sentence[]>('SENTENCES', (result) => result || [])

export default SentencesWorker