/* eslint-disable no-console */
import pa11y from "pa11y"

const runPa11y = async () => {
  try {
    const options = {
      runners: ["axe"],
      standard: "WCAG2AAA",
      chromeLaunchConfig: {
        args: ["--no-sandbox"],
      },
      log: {
        debug: console.log,
        error: console.error,
        info: console.log,
      },
      includeWarnings: false,
      includeNotices: false,
    }

    const urls = [pa11y("http://localhost:3000/home", options)]

    const results = await Promise.all(urls)

    results.forEach((result) => {
      console.log(`${result.pageUrl}:`)
      result.issues.map((issue) => console.log(issue))
    })
  } catch (error) {
    console.error(error.message)
  }
}

export default runPa11y()
