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

// Call Functions
renderJokesList()
renderCopyrightYear()

// Functions
async function getJokes() {
  common.printFunction(`getJokes`)

  let thisData: any = {
    jokes: [],
    timestamp: 0,
  }

  const storageData = common.getLocalStorageItem(common.strJokes)
  thisData = JSON.parse(String(storageData))
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

async function renderJokesList() {
  common.printFunction(`renderJokesList`)

  if (jokesListEl) {
    jokesListEl.innerHTML = ``

    const jokes = await getJokes()

    let cardsHtml = ``
    jokes.forEach(({ slug, title, created_at }: any) => {
      cardsHtml += `
          <a href="./joke.html?slug=${slug}" class="card shadow-v-br-400">
            <h3 class="card__title">${title}</h3>
            <p class="card__date">${dayjs(created_at).format(
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
