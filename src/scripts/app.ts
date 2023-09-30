import "./../styles/app.scss"
import dayjs from "dayjs"
// import * as common from "./common"
import LibLog from "./lib/log"
import LibLocalStorage from "./lib/localStorage"
import LibElement from "./lib/element"
import LibDate from "./lib/date"
import LibCms from "./lib/cms"

console.log(`app.ts loaded`)

// Variables
const jokesListEl: HTMLElement | null = LibElement.get(`jokes-list`)
const copyrightYearEl: HTMLElement | null = LibElement.get(`copyright-year`)
const searchInputEl: HTMLElement | null = LibElement.get(`search-form`)

// Call Functions
const jokes = await getJokes()
renderJokesList(jokes)
searchJokes(jokes)
renderCopyrightYear()

// Functions
async function getJokes() {
  LibLog.logFunction(`getJokes`)

  let thisData: any = {
    jokes: [],
    timestamp: dayjs().unix(),
  }

  const storageData = LibLocalStorage.get(LibLocalStorage.KEY_JOKES)
  if (storageData) {
    thisData = JSON.parse(String(storageData))
  }
  // console.log(`thisData`, thisData)

  const thisDataTimestamp = dayjs(thisData.timestamp)
  const nowTimestamp = dayjs(LibDate.now.unix())
  const timeDiff = nowTimestamp.diff(thisDataTimestamp, "days")

  if (thisData.jokes.length <= 0 || timeDiff > LibLocalStorage.COOKIE_LENGTH) {
    console.log(`Fetch new jokes`)

    const data = LibCms.get(LibCms.url())

    if (data.status === LibCms.STATUS_SUCCESS) {
      thisData = {
        jokes: data?.jokes?.data,
        timestamp: LibDate.now.unix(),
      }

      LibLocalStorage.set(LibLocalStorage.KEY_JOKES, JSON.stringify(thisData))
    }
  }

  return thisData.jokes
}

async function renderJokesList(jokes: any) {
  LibLog.logFunction(`renderJokesList`)

  LibLog.logVariable(`jokes`, jokes)

  if (jokesListEl && jokes && jokes.length > 0) {
    jokesListEl.innerHTML = ``

    let cardsHtml = ``
    jokes.forEach(({ slug, title, created_at }: any, index: number) => {
      cardsHtml += `
          <a href="./joke?slug=${slug}" class="card shadow-v-br-400">
            <h3 class="card__title">${index + 1}) ${title}</h3>
            <p class="card__date">Written on: ${dayjs(created_at).format(
              LibDate.DATE_FORMAT_DD_MMM_YYYY
            )}</p>
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

function searchJokes(jokes: any): void {
  LibLog.logFunction(`searchJokes`)

  if (searchInputEl) {
    searchInputEl.addEventListener(`input`, function (event) {
      event.preventDefault()
      const search: string = event.target.value

      let thisJokes = jokes

      if (search && search !== "") {
        LibLog.logVariable(`search`, search)
        thisJokes = jokes.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase())
        )
      }

      LibLog.logVariable(`thisJokes`, thisJokes)
      renderJokesList(thisJokes)
    })
  }
}

function renderCopyrightYear() {
  LibLog.logFunction(`renderCopyrightYear`)

  const year: number = LibDate.YEAR

  if (copyrightYearEl) {
    const copyrightYear: any =
      Number(LibDate.now.format(LibDate.DATE_FORMAT_YYYY)) !== year
        ? `${year} &ndash; ${LibDate.now.format(LibDate.DATE_FORMAT_YYYY)}`
        : `${year}`
    copyrightYearEl.innerHTML = copyrightYear
  }
}
