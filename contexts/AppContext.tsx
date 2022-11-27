import React, {useState, useEffect} from 'react'
import {fetchAll} from '../utlls/comm'
import {List, Item} from '../types'

interface AppState {
  lists: List[],
  filter: 'all' | 'active' | 'finished',
  setFilter: (value: 'all' | 'active' | 'finished') => void,
  fetchData: () => Promise<void>,
}

export const AppContext = React.createContext<AppState | null>(null)

export const DataLoader = (props: any) => {
  const [lists, setLists] = useState<List[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'finished'>('all')
  const fetchData = async () => {
    const res = await fetchAll()
    setLists(res)
  }
  useEffect(() => { 
    fetchData()
  }, [])

  return (
    <AppContext.Provider
      value={{
        lists,
        filter,
        setFilter,
        fetchData,
      }}>
      {props.children}
    </AppContext.Provider>
  )
}