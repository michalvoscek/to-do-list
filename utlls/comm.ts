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

export const addItem = async (listId: string, title: string, description: string, deadline: string): Promise<string> => {
  const {data} = await axios.post(
    `https://6380986d8efcfcedac096e3c.mockapi.io/api/v1/ToDoList/${listId}/ToDoItem`,
    {title, description, deadline, finished: false}
  )
  return data.id
}

export const markFinished = async (listId: string, itemId: string) => {
  await axios.put(
    `https://6380986d8efcfcedac096e3c.mockapi.io/api/v1/ToDoList/${listId}/ToDoItem/${itemId}`,
    {finished: true}
  )
}

export const deleteItem = async (listId: string, itemId: string) => {
  await axios.delete(
    `https://6380986d8efcfcedac096e3c.mockapi.io/api/v1/ToDoList/${listId}/ToDoItem/${itemId}`
  )
}