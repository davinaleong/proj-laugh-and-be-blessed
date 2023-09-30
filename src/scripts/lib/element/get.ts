import { DATA_ELEMENT_ATTR } from "./variables"

function get(
  name: string,
  parent: HTMLElement | null = null
): HTMLElement | null {
  const query: string = `[${DATA_ELEMENT_ATTR}="${name}"]`

  if (parent) {
    return parent.querySelector(query)
  }

  return document.querySelector(query)
}

export default get
