const localStorageKey = '__auth_provider_token__'

async function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse(user) {
  window.localStorage.setItem(localStorageKey, user.username)
  return user
}

function login() {
  return client('users/1').then(handleUserResponse)
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

const authURL = process.env.REACT_APP_API_URL

// slightly different from the client function in utils/api-client
// we could resolve to using the same function but then again, we are only using them twice anyways
async function client(endpoint) {
  const config = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { getToken, login, logout, localStorageKey }
