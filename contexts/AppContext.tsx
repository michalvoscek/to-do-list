import React, {useState, useEffect} from 'react'
import {fetchAll} from '../utlls/comm'

interface AppState {
  lists: string[][],
  items: string[][],
  filter: 'all' | 'active' | 'finished',
  setFilter: (value: 'all' | 'active' | 'finished') => void,
  addList: (name: string) => void,
  addItem: (title: string, description: string, deadline: string) => void
}

export const AppContext = React.createContext<AppState | null>(null)

export const DataLoader = (props: any) => {
  const [lists, setLists] = useState<string[][]>([])
  const [items, setItems] = useState<string[][]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'finished'>('all')
  const addList = (name: string) => {
    // todo
  }
  const addItem = (title: string, description: string, deadline: string) => {
    // todo
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAll()
      setLists(res.lists)
      setItems(res.items)
    }
    fetchData()
  }, [])

  return (
    <AppContext.Provider
      value={{
        lists,
        items,
        filter,
        setFilter,
        addList,
        addItem,
      }}>
      {props.children}
    </AppContext.Provider>
  )
}