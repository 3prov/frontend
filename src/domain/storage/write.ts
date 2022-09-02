import { createStorageWorker } from "../../packages/storage-worker";

type EssayText = string

const WriteWorker = createStorageWorker<EssayText>('WRITE', (result) => result || '')

export default WriteWorker