import axios from 'axios'

export const getData = ({path}) => {
  const url = `http://localhost:3008/${path}`

  return axios({method: 'get', url, mode: 'cors', responseType: 'json'})
}

export const paginateData = ({page, limit}) => {
  const url = `http://localhost:3008/people?_page=${page}&_limit=${limit}`

  return axios({method: 'get', url, mode: 'cors', responseType: 'json'})
}

export const searchData = ({search, page, limit}) => {
  const url = `http://localhost:3008/people?q=${search}&_page=${page}&_limit=${limit}`

  return axios({method: 'get', url, mode: 'cors', responseType: 'json'})
}
export const saveData = ({id, name, birth_year, homeworld}) => {
  const url = `http://localhost:3008/people/${id}`
  let data = {
    name,
    birth_year,
    homeworld
  }
  return axios({method: 'patch', data, url, mode: 'cors', responseType: 'json'})

}
