import dayjs from "dayjs"
import * as common from "./common"

console.log(`joke.ts loaded`)

// Variables
const jokeEl: HTMLInputElement | null = document.querySelector(
  `[${common.dataElementAttr}="joke"]`
)

// Call Functions
renderJoke()

// Functions
function getJoke() {
  common.printFunction(`getJoke`)

  const urlParams = new URLSearchParams(window.location.search)
  const slug = urlParams.get("slug")
  console.log(`slug`, slug)

  const strData: string = String(common.getLocalStorageItem(common.strJokes))
  const data: any = JSON.parse(strData)
  console.log(`data`, data)

  const joke = data.jokes.filter((joke) => joke.slug === slug)[0]
  console.log(`joke`, joke)

  return joke
}

function renderJoke() {
  common.printFunction(`renderJoke`)

  const joke = getJoke()

  if (joke && jokeEl) {
    const { title, text, created_at } = joke
    jokeEl.innerHTML = `
        <section>
          <h2 class="section__title">${title}</h2>

          <div class="joke-content">${text.replace(
            /(?:\r\n|\r|\n)/g,
            "<br>"
          )}</div>

          <p class="joke-date">Written on: ${dayjs(created_at).format(
            common.strDateFormat
          )}</p>
        </section>
    `
  }
}
