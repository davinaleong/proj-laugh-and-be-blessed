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
const now = dayjs()

const dataElementAttr: string = `data-element`

const jokesListEl: HTMLInputElement | null = document.querySelector(
  `[${dataElementAttr}="jokes-list"]`
) as HTMLInputElement | null
const copyrightYearEl: HTMLInputElement | null = document.querySelector(
  `[${dataElementAttr}="copyright-year"]`
) as HTMLInputElement | null

// getJokes()
renderJokesList()
renderCopyrightYear()

// Functions
function printFunction(name: string, params: any = {}): void {
  console.log(`fn: ${name}(${JSON.stringify(params)})`)
}

async function getJokes() {
  printFunction(`getJokes`)

  let thisData: any = {
    jokes: [],
    timestamp: 0,
  }

  const storageData = getLocalStorageItem(strJokes)
  thisData = JSON.parse(String(storageData))
  // console.log(`thisData`, thisData)

  const thisDataTimestamp = dayjs(thisData.timestamp)
  const nowTimestamp = dayjs(now.unix())
  const timeDiff = nowTimestamp.diff(thisDataTimestamp, "days")

  if (thisData.jokes.length <= 0 || timeDiff > cookieLength) {
    console.log(`Fetch new jokes`)

    const response = await window.fetch(url)
    const data = await response.json()

    if (data.status === strSuccess) {
      thisData = {
        jokes: data?.jokes?.data,
        timestamp: now.unix(),
      }

      setLocalStorageItem(strJokes, JSON.stringify(thisData))
    }
  }
  // console.log(`thisData`, thisData)

  return thisData.jokes
}

async function renderJokesList() {
  printFunction(`renderJokesList`)

  if (jokesListEl) {
    jokesListEl.innerHTML = ``

    const jokes = await getJokes()

    let cardsHtml = ``
    jokes.forEach(({ slug, title, created_at }: any) => {
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

function renderCopyrightYear() {
  printFunction(`renderCopyrightYear`)

  if (copyrightYearEl) {
    const copyrightYear: any =
      Number(now.format(`YYYY`)) !== year
        ? `${year} &ndash; ${now.format(`YYYY`)}`
        : `${year}`
    copyrightYearEl.innerHTML = copyrightYear
  }
}

function setLocalStorageItem(key: string, item: string): void {
  printFunction(`setLocalStorageItem`, { key, item })

  /*
  window.localStorage.setItem(
        ConfigData.cacheKey,
        JSON.stringify(newSettings)
      )
  */
  localStorage.setItem(key, item)
}

function getLocalStorageItem(key: string): string | null {
  printFunction(`getLocalStorageItem`, { key })

  /*
  const cachedSettings = JSON.parse(
      window.localStorage.getItem(ConfigData.cacheKey)
    )
  */
  return localStorage.getItem(key)
}
