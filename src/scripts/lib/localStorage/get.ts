import logFunction from "../log/log-function"

function get(key: string): string | null {
  logFunction(`getLocalStorageItem`, { key })

  return localStorage.getItem(key)
}

export default get
