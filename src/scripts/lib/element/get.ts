import { DATA_ELEMENT_ATTR } from "./variables"

function get(
  name: string,
  parent: HTMLElement | null = null
): HTMLElement | null {
  if (parent) {
    return parent.querySelector(`[${DATA_ELEMENT_ATTR}]="${name}"`)
  }

  return document.querySelector(`[${DATA_ELEMENT_ATTR}]="${name}"`)
}

export default get
