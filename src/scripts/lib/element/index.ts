import { DATA_ELEMENT_ATTR, DATA_ACTIVE_ATTR } from "./variables"
import get from "./get"
import getAll from "./get-all"
import toggleAttr from "./toggle-attr"
import { LibElement, LibElementInterface } from "../interfaces"

const LibElement: LibElementInterface = {
  DATA_ELEMENT_ATTR,
  DATA_ACTIVE_ATTR,
  get,
  getAll,
  toggleAttr,
}

export default LibElement
