export interface LibInterface {
  //   logFunction(name: string, params: any): void
  //   logValue(name: string, value: any): void
  //   getElement(name: string, parent: HTMLElement | null): HTMLElement
  //   getElements(name: string, parent: HTMLElement | null): NodeListOf<HTMLElement>
  //   getLocalStorageItem(key: string, item: string): void
  LibLog: LibLocalStorageInterface
  LibLocalStorage: LibLocalStorageInterface
  LibElement: LibElementInterface
}

export interface LibLogInterface {
  logFunction(name: string, params: any): void
  logValue(name: string, value: any): void
}

export interface LibLocalStorageInterface {
  get(key: string): string | null
  set(key: string, item: string): void
}

export interface LibElementInterface {
  DATA_ELEMENT_ATTR: string
  DATA_ACTIVE_ATTR: string
  get(name: string, parent: HTMLElement | null): HTMLElement | null
  getAll(name: string, parent: HTMLElement | null): NodeListOf<HTMLElement>
  toggleAttr(
    element: HTMLElement,
    value: string | boolean | number | null,
    attr: string
  ): void
}
