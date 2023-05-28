import dayjs from "dayjs"
import * as common from "./common"

console.log(`joke.ts loaded`)

const jokeEl: HTMLInputElement | null = document.querySelector(
  `[${common.dataElementAttr}="joke"]`
)
