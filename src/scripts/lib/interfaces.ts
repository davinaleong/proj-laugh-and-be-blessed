export interface LibInterface {
  LibLog: LibLogInterface
  LibLocalStorage: LibLocalStorageInterface
  LibElement: LibElementInterface
  LibDate: LibDateInterface
}

export interface LibLogInterface {
  logFunction(name: string, params?: any): void
  logVariable(name: string, value: any): void
}

export interface LibLocalStorageInterface {
  KEY_JOKES: string
  get(key: string): string | null
  set(key: string, item: string): void
}

export interface LibElementInterface {
  DATA_ELEMENT_ATTR: string
  DATA_ACTIVE_ATTR: string
  get(name: string, parent?: HTMLElement | null): HTMLElement | null
  getAll(name: string, parent?: HTMLElement | null): NodeListOf<HTMLElement>
  toggleAttr(
    element: HTMLElement,
    value: string | boolean | number | null,
    attr: string
  ): void
}

export interface LibDateInterface {
  YEAR: number
  DATE_FORMAT_YYYY: string
  DATE_FORMAT_DD_MMM_YYYY: string
  now: any
}
