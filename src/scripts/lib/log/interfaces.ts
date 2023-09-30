export interface LibLog {
  logFunction(name: string, params: any): void
  logValue(name: string, value: any): void
}
