import { DATA_ELEMENT_ATTR } from "./variables"

function getAll(
  name: string,
  parent: HTMLElement | null
): NodeListOf<HTMLElement> {
  if (parent) {
    return parent.querySelectorAll(`[${DATA_ELEMENT_ATTR}]="${name}"`)
  }

  return document.querySelectorAll(`[${DATA_ELEMENT_ATTR}]="${name}"`)
}

export default getAll
