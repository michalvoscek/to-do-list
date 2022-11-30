import React, {useState, useEffect} from 'react'
import _ from 'lodash'
import {fetchAll} from '../utlls/comm'
import {List, Item} from '../types'

interface AppState {
  lists: {[key: string]: List},
  listsOrder: string[],
  isFetched: boolean,
  fetchData: () => Promise<void>,
}

export const AppContext = React.createContext<AppState | null>(null)

export const DataLoader = (props: any) => {
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [lists, setLists] = useState<{[key: string]: List}>({})
  const [listsOrder, setListsOrder] = useState<string[]>([])
  const fetchData = async () => {
    const res: List[] = await fetchAll()
    const listsOrder: string[] = res.map((l) => l.id)
    const lists: {[key: string]: List} = _.flow([
      _.partialRight(_.map, (l: List) => [l.id, l]),
      _.fromPairs
    ])(res)
    setListsOrder(listsOrder)
    setLists(lists)
    setIsFetched(true)
  }
  useEffect(() => { 
    fetchData()
  }, [])

  return (
    <AppContext.Provider
      value={{
        lists,
        listsOrder,
        fetchData,
        isFetched,
      }}>
      {props.children}
    </AppContext.Provider>
  )
}