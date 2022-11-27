import axios from 'axios'
import {List} from '../types'

export const fetchAll = async (): Promise<List[]> => {
  const {data} = await axios.get('https://6380986d8efcfcedac096e3c.mockapi.io/api/v1/ToDoList')
  return data
}

export const addList = async (title: string): Promise<string> => {
  const {data} = await axios.post(
    'https://6380986d8efcfcedac096e3c.mockapi.io/api/v1/ToDoList',
    {title}
  )
  return data.id
}
