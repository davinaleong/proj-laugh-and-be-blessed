import { LibLocalStorageInterface } from "../interfaces"
import get from "./get"
import set from "./set"
import { KEY_JOKES } from "./variables"

const LibLocalStorage: LibLocalStorageInterface = {
  KEY_JOKES,
  get,
  set,
}

export default LibLocalStorage
