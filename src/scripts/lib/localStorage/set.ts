import logFunction from "../log/log-function"

function set(key: string, item: string): void {
  logFunction(`setLocalStorageItem`, { key, item })

  localStorage.setItem(key, item)
}

export default set
