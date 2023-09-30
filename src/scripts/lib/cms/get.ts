import logVariable from "../log/log-variable"
import { STATUS_SUCCESS } from "./variables"

async function get(url: string): Promise<any> {
  try {
    const response = await fetch(url)
    return response.json()
  } catch (error: any) {
    logVariable(`error`, error)
    return null
  }
}

export default get
