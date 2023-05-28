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
const jokeGroups = await getJokeGroups()
renderJokesList(jokeGroups)
// searchJokes(jokeGroups)
renderCopyrightYear()

// Functions
async function getJokeGroups() {
  common.printFunction(`getJokeGroups`)

  let thisData: any = {
    jokeGroups: [],
    timestamp: 0,
  }

  const storageData = common.getLocalStorageItem(common.strJokes)
  thisData = JSON.parse(String(storageData))
  // console.log(`thisData`, thisData)

  const thisDataTimestamp = dayjs(thisData.timestamp)
  const nowTimestamp = dayjs(common.now.unix())
  const timeDiff = nowTimestamp.diff(thisDataTimestamp, "days")

  if (
    (thisData.jokeGroups && thisData.jokeGroups.length <= 0) ||
    timeDiff > 1
  ) {
    console.log(`Fetch new jokes`)

    const response = await window.fetch(url)
    const data = await response.json()

    if (data.status === strSuccess) {
      thisData = {
        jokeGroups: data?.jokes?.data.reduce(function (jokeGroups, joke) {
          jokeGroups[joke.first_character] = []
          jokeGroups[joke.first_character].push(joke)
          return jokeGroups
        }, {}),
        timestamp: common.now.unix(),
      }

      common.setLocalStorageItem(common.strJokes, JSON.stringify(thisData))
    }
  }
  // console.log(`thisData`, thisData)

  return thisData.jokeGroups
}

async function renderJokesList(jokeGroups: any) {
  common.printFunction(`renderJokesList`)

  console.log(`jokeGroups`, jokeGroups)

  if (jokesListEl && jokeGroups) {
    jokesListEl.innerHTML = ``

    /*
    <section>
          <h2 class="section__title">Retrieving joke list &hellip;</h2>
        </section>
    */

    let sectionsHtml = ``
    let cardsHtml = ``
    const jokeGroupKeys: any = Object.keys(jokeGroups)
    console.log(`jokeGroupKeys`, jokeGroupKeys)

    jokeGroupKeys.forEach(function (jokeGroupKey) {
      const sectionTitle = `<h2 class="section__title">${jokeGroupKey}</h2>`

      const jokes = jokeGroups[jokeGroupKey]
      console.log(`jokes`, jokes)

      jokes.forEach(function ({ title, slug, created_at }) {
        cardsHtml += `
            <a href="./joke.html?slug=${slug}" class="card shadow-v-br-400">
              <h3 class="card__title">${title}</h3>
              <p class="card__date">Written on: ${dayjs(created_at).format(
                common.strDateFormat
              )}</p>
            </a>
          `
      })

      sectionsHtml += `
      <section>
        ${sectionTitle}

        <div class="card-grid">${cardsHtml}</div>
      </section>
      `
    })

    jokesListEl.innerHTML = sectionsHtml
  }
}

function searchJokes(jokeGroups: any): void {
  common.printFunction(`searchJokes`)

  if (searchInputEl) {
    searchInputEl.addEventListener(`input`, function (event) {
      event.preventDefault()
      const search: string = event.target.value

      let thisJokeGroups = jokeGroups

      if (search && search !== "") {
        console.log(`search`, search)
        // thisJokeGroups = jokes.filter(({ name }) =>
        //   name.toLowerCase().includes(search.toLowerCase())
        // )
        let joke: any = null
        const thisJokeGroupKeys = Object.keys(thisJokeGroups)
        thisJokeGroupKeys.forEach(function (thisJokeGroupKey) {
          const jokes = thisJokeGroupKey[thisJokeGroupKey]
          joke = jokes.filter(({ title }) =>
            title.toLowerCase().includes(search.toLowerCase())
          )
        })

        if (joke && joke.first_character) {
          thisJokeGroups = {}
          thisJokeGroups[joke.first_character] = []
          thisJokeGroups[joke.first_character].push(joke)
        }
      }

      console.log(`thisJokeGroups`, thisJokeGroups)
      renderJokesList(thisJokeGroups)
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
