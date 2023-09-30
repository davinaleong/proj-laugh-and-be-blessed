import { DATA_ACTIVE_ATTR } from "./variables"

function toggleAttr(
  element: HTMLElement,
  value: string | boolean | number | null = false,
  attr: string = DATA_ACTIVE_ATTR
): void {
  if (value || value !== "") {
    element.setAttribute(attr, String(value))
  } else {
    element.removeAttribute(attr)
  }
}

export default toggleAttr
