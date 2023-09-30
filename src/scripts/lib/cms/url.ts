import { SOURCE, PER_PAGE, COLUMN } from "./variables"

function url(
  source: string = SOURCE,
  perPage: number = PER_PAGE,
  column: string = COLUMN
): string {
  return `${source}?perPage=${perPage}&column=${column}`
}

export default url
