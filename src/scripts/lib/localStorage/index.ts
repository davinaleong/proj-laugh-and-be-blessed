import { LibLocalStorageInterface } from "../interfaces"
import get from "./get"
import set from "./set"

const LibLocalStorage: LibLocalStorageInterface = {
  get,
  set,
}

export default LibLocalStorage
