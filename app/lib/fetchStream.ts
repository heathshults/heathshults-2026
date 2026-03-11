async function streamData(url) {
  const response = await fetch(url)
  // Ensure the response body is available and ok
  if (!response.body) {
    throw new Error('Response body is not available for streaming')
  }

  // Use TextDecoder to convert byte chunks to text
  const decoder = new TextDecoder()

  // Iterate over each chunk in the readable stream
  for await (const chunk of response.body) {
    const textChunk = decoder.decode(chunk, { stream: true })
    console.log('Received chunk:', textChunk)
    // You can process the data here, e.g., update the UI
  }

  // The loop exits when the stream is done
  console.log('Stream finished.')
}
// Example usage
streamData('https://api.example.com')
