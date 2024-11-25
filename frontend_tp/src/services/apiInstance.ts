// Import axios for making HTTP requests
import axios from 'axios'

const URL = 'https://tasks.api.hvdevs.com/'

// Fetch CSRF token from API endpoint
const csrfToken = await axios.get(URL + 'auth/csrf', {
  withCredentials: true,
})

// Create an instance of axios with CSRF token included in headers
export const apiInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'csrf-token': csrfToken.data.csrfToken,
  },
})
