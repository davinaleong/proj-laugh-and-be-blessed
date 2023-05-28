import dayjs from "dayjs"

console.log(`common.ts loaded`)

// Variables
export const strJokes: string = `jokes`
export const now = dayjs()
export const strDateFormat: string = "DD MMM YYYY"

export const dataElementAttr: string = `data-element`

// Functions
export function printFunction(name: string, params: any = {}): void {
  console.log(`fn: ${name}(${JSON.stringify(params)})`)
}

export function setLocalStorageItem(key: string, item: string): void {
  printFunction(`setLocalStorageItem`, { key, item })

  localStorage.setItem(key, item)
}

export function getLocalStorageItem(key: string): string | null {
  printFunction(`getLocalStorageItem`, { key })

  return localStorage.getItem(key)
}
