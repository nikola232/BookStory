const apiBase = `http://localhost:3000`;

const defaultPostHeaders = {
  'Content-Type': 'application/json',
}

export default {
  makeGetCall: async (path: string, authorize = false, headers?: any) => {
    const url = `${apiBase}/${path}`
    const config: any = {
      method: 'GET',
      headers: headers
    }
    
    try {
      const res = await fetch(url, config)
      return await res.json()
    } catch (e: any) {
      console.log(e)
      console.log(`Error during GET '/${path}': ${e.responseMessage}`)
      return {status: false}
    }
  },
  makePostCall: async (path: string, authorize = false, body?: any, headers: any = defaultPostHeaders) => {
    const url = `${apiBase}/${path}`
    const config: any = {
      method: 'POST',
      body: headers['Content-Type'] === 'application/json' ? JSON.stringify(body) : body ,
      headers: {
        ...headers
      }
    }

    try {
      const res = await fetch(url, config)
      return await res.json()
    } catch (e: any) {
      console.log(e)
      console.log(`Error during POST '/${path}': ${e.responseMessage}`)
      return {status: false}
    }

  },
  makePutCall: async (path: string, authorize = false, body?: any, headers: any = defaultPostHeaders) => {
    const url = `${apiBase}/${path}`
    const config: any = {
      method: 'PUT',
      body: headers['Content-Type'] === 'application/json' ? JSON.stringify(body) : body ,
      headers: {
        ...headers
      }
    }

    try {
      const res = await fetch(url, config)
      return await res.json()
    } catch (e: any) {
      console.log(e)
      console.log(`Error during POST '/${path}': ${e.responseMessage}`)
      return {status: false}
    }

  },
  makeDeleteCall: async (path: string, authorize = false, headers: any = defaultPostHeaders) => {
    const url = `${apiBase}/${path}`
    const config: any = {
      method: 'DELETE',
      headers: {
        ...headers
      }
    }
        
    try {
      const res = await fetch(url, config)
      return await res.json()
    } catch (e: any) {
      console.log(e)
      console.log(`Error during Delete '/${path}': ${e.responseMessage}`)
      return {status: false}
    }

  }
}
