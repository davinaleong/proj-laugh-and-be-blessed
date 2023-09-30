import { LibLocalStorageInterface } from "../interfaces"
import get from "./get"
import set from "./set"
import { KEY_JOKES, COOKIE_LENGTH } from "./variables"

const LibLocalStorage: LibLocalStorageInterface = {
  KEY_JOKES,
  COOKIE_LENGTH,
  get,
  set,
}

export default LibLocalStorage
