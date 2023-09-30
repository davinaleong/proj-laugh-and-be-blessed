import { DATA_ELEMENT_ATTR } from "./variables"

function getAll(
  name: string,
  parent: HTMLElement | null = null
): NodeListOf<HTMLElement> {
  const query: string = `[${DATA_ELEMENT_ATTR}="${name}"]`

  if (parent) {
    return parent.querySelectorAll(query)
  }

  return document.querySelectorAll(query)
}

export default getAll
