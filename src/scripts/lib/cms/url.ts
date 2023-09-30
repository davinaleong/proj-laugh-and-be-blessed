import logVariable from "../log/log-variable"
import { SOURCE, PER_PAGE, COLUMN } from "./variables"

function url(
  source: string = SOURCE,
  perPage: number = PER_PAGE,
  column: string = COLUMN
): string {
  const url: string = `${source}?perPage=${perPage}&column=${column}`

  logVariable(`url`, url)

  return url
}

export default url
