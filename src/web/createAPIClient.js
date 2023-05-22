import axios from "axios"

const createAPIClient = ({ jwt } = {}) =>
  axios.create({
    baseURL: "/api",
    headers: {
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
  })

export default createAPIClient
