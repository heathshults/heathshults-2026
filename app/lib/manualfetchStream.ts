/**
 * This function demonstrates how to manually fetch data from a URL and process it as a stream.
 * It uses the Fetch API to make a request and then reads the response body as a stream.
 * The TextDecoder is used to convert byte chunks into text, allowing you to handle
 * data as it arrives without waiting for the entire response.
 *
 * Note: Ensure that the server supports streaming responses for this to work effectively.
 * You can test this with APIs that provide streaming data, such as those that use Server-Sent Events (SSE) or WebSockets.
 */

async function readStreamManually(url) {
  const response = await fetch(url)
  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break // Exit the loop when the stream is finished
      }
      // 'value' is a Uint8Array chunk of data
      const textChunk = decoder.decode(value)
      console.log('Received chunk:', textChunk)
    }
  } catch (error) {
    console.error('Streaming error:', error)
  } finally {
    reader.releaseLock() // Release the lock in case of errors or completion
    console.log('Stream finished.')
  }
}

// Example usage
readStreamManually('https://api.example.com')
