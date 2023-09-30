import { LibCmsInterface } from "../interfaces"
import {
  SOURCE,
  PER_PAGE,
  COLUMN,
  STATUS_ERROR,
  STATUS_SUCCESS,
} from "./variables"
import url from "./url"
import get from "./get"

const LibCms: LibCmsInterface = {
  SOURCE,
  PER_PAGE,
  COLUMN,
  STATUS_ERROR,
  STATUS_SUCCESS,
  url,
  get,
}

export default LibCms
