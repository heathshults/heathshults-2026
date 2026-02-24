import config from '@config/app.config'

export async function pageData(filename) {
  const data = fetch(`${config.baseUrl}/data/${filename}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!data.ok) {
    console.error('ERROR:', 'failed to fetch data for filename:', filename)
    return 'Failed to fetch data'
  }
  return await data.json()
}
