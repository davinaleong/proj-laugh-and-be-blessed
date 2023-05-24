import dayjs from "dayjs"

console.log(`main.js loaded`)

// Attributes
const strJokes: string = `jokes`
const strError: string = `ERROR`
const strSuccess: string = `SUCCESS`
const strDateFormat: string = "DD MMM YYYY"
const cookieLength = 14

const url: string = `https://davinas-cms.herokuapp.com/api/davdevs/jokes?perPage=1000&column=name`
const year: number = 2023
const now: Date = new Date()

const dataElementAttr: string = `data-element`

const jokesListEl: HTMLInputElement | null = document.querySelector(
  `[${dataElementAttr}="jokes-list"]`
) as HTMLInputElement | null
const copyrightYearEl: HTMLInputElement | null = document.querySelector(
  `[${dataElementAttr}="copyright-year"]`
) as HTMLInputElement | null

getJokes()
// renderJokesList()
renderCopyrightYear()

// Functions
function printFunction(name: string, params: any = {}) {
  console.log(`fn: ${name}(${JSON.stringify(params)})`)
}

function getJokes() {
  printFunction(`getJokes`)

  // TODO: Get joke from cookie
  let jokes = [
    {
      id: 1,
      title: "Lorem Ipsum Dolor",
    },
    {
      id: 2,
      title: "Hello World",
    },
  ]
  let data = getCookie(strJokes)
  console.dir("data", data)
  // TODO: If cookie is expired get from API
  // TODO: Store new data into cookie
  setCookie(strJokes, JSON.stringify(jokes), cookieLength)
  console.dir("aft data", getCookie(strJokes))
  // TODO: Return cookie data
}

async function renderJokesList() {
  printFunction(`renderJokesList`)

  if (jokesListEl) {
    jokesListEl.innerHTML

    const response = await window.fetch(url)
    const data = await response.json()

    if (data.status === strSuccess) {
      let cardsHtml = ``
      data?.jokes?.data.map(({ slug, title, created_at }: any) => {
        cardsHtml += `
          <a href="./jokes.html?slug=${slug}" class="card shadow-v-br-400">
            <h3 class="card__title">${title}</h3>
            <p class="card__date">${dayjs(created_at).format(strDateFormat)}</p>
          </a>
        `
      })

      jokesListEl.innerHTML = `
        <section>
          <div class="card-grid">${cardsHtml}</div>
        </section>
      `
    }
  }
}

function renderCopyrightYear() {
  printFunction(`renderCopyrightYear`)

  if (copyrightYearEl) {
    const copyrightYear: any =
      now.getFullYear() !== year
        ? `${year} &ndash; ${now.getFullYear()}`
        : `${year}`
    copyrightYearEl.innerHTML = copyrightYear
  }
}

// Courtesy of: Mandeep Janjua, StackOverflow
function setCookie(name: string, value: string, days: number): void {
  printFunction(`setCookie`, { name, value, days })
  let expires = ""
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

function getCookie(name: string): string | null {
  printFunction(`getCookie`, { name })

  let nameEQ = name + "="
  let ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function eraseCookie(name: string): void {
  printFunction(`eraseCookie`, { name })

  document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}
