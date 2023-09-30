export interface LibInterface {
  LibLog: LibLogInterface
  LibLocalStorage: LibLocalStorageInterface
  LibElement: LibElementInterface
  LibDate: LibDateInterface
  LibCms: LibCmsInterface
}

export interface LibLogInterface {
  logFunction(name: string, params?: any): void
  logVariable(name: string, value: any): void
}

export interface LibLocalStorageInterface {
  KEY_JOKES: string
  COOKIE_LENGTH: number
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

export interface LibCmsInterface {
  SOURCE: string
  PER_PAGE: number
  COLUMN: string
  STATUS_ERROR: string
  STATUS_SUCCESS: string
  url(source?: string, perPage?: number, column?: string): string
  get(url: string): Promise<any>
}
