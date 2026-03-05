function normalizeBaseUrl(baseUrl?: string) {
  if (!baseUrl) return ''
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
}

export async function pageData<T = unknown>(filename: string, clientBaseUrl?: string, signal?: AbortSignal): Promise<T | null> {
  const baseUrl = normalizeBaseUrl(clientBaseUrl)
  const filepath = baseUrl ? `${baseUrl}/data/${filename}.json` : `/data/${filename}.json`

  try {
    const response = await fetch(filepath, {
      method: 'GET',
      signal,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn('ERROR:', 'failed to fetch data for filename:', filename, 'status:', response.status)
      return null
    }

    return (await response.json()) as T
  } catch (error) {
    console.warn('ERROR:', 'failed to fetch data for filename:', filename, error)
    return null
  }
}
