import dayjs from "dayjs"
import * as common from "./common"

console.log(`main.ts loaded`)

// Variables
const strError: string = `ERROR`
const strSuccess: string = `SUCCESS`
const cookieLength = 14

const url: string = `https://davinas-cms.herokuapp.com/api/davdevs/jokes?perPage=1000&column=name`
const year: number = 2023

const jokesListEl: HTMLInputElement | null = document.querySelector(
  `[${common.dataElementAttr}="jokes-list"]`
) as HTMLInputElement | null
const copyrightYearEl: HTMLInputElement | null = document.querySelector(
  `[${common.dataElementAttr}="copyright-year"]`
) as HTMLInputElement | null

const searchInputEl: HTMLInputElement | null = document.querySelector(
  `[${common.dataElementAttr}="search-form"] input`
)

// Call Functions
const jokes = await getJokes()
renderJokesList(jokes)
searchJokes(jokes)
renderCopyrightYear()

// Functions
async function getJokes() {
  common.printFunction(`getJokes`)

  let thisData: any = {
    jokes: [],
    timestamp: dayjs().unix(),
  }

  const storageData = common.getLocalStorageItem(common.strJokes)
  if (storageData) {
    thisData = JSON.parse(String(storageData))
  }
  // console.log(`thisData`, thisData)

  const thisDataTimestamp = dayjs(thisData.timestamp)
  const nowTimestamp = dayjs(common.now.unix())
  const timeDiff = nowTimestamp.diff(thisDataTimestamp, "days")

  if (thisData.jokes.length <= 0 || timeDiff > cookieLength) {
    console.log(`Fetch new jokes`)

    const response = await window.fetch(url)
    const data = await response.json()

    if (data.status === strSuccess) {
      thisData = {
        jokes: data?.jokes?.data,
        timestamp: common.now.unix(),
      }

      common.setLocalStorageItem(common.strJokes, JSON.stringify(thisData))
    }
  }
  // console.log(`thisData`, thisData)

  return thisData.jokes
}

async function renderJokesList(jokes: any) {
  common.printFunction(`renderJokesList`)

  console.log(`jokes`, jokes)

  if (jokesListEl && jokes && jokes.length > 0) {
    jokesListEl.innerHTML = ``

    let cardsHtml = ``
    jokes.forEach(({ slug, title, created_at }: any, index: number) => {
      cardsHtml += `
          <a href="./joke?slug=${slug}" class="card shadow-v-br-400">
            <h3 class="card__title">${index + 1}) ${title}</h3>
            <p class="card__date">Written on: ${dayjs(created_at).format(
              common.strDateFormat
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
  common.printFunction(`searchJokes`)

  if (searchInputEl) {
    searchInputEl.addEventListener(`input`, function (event) {
      event.preventDefault()
      const search: string = event.target.value

      let thisJokes = jokes

      if (search && search !== "") {
        console.log(`search`, search)
        thisJokes = jokes.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase())
        )
      }

      console.log(`thisJokes`, thisJokes)
      renderJokesList(thisJokes)
    })
  }
}

function renderCopyrightYear() {
  common.printFunction(`renderCopyrightYear`)

  if (copyrightYearEl) {
    const copyrightYear: any =
      Number(common.now.format(`YYYY`)) !== year
        ? `${year} &ndash; ${common.now.format(`YYYY`)}`
        : `${year}`
    copyrightYearEl.innerHTML = copyrightYear
  }
}
