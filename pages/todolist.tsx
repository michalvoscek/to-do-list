import {useRouter} from 'next/router'
import {useContext, useMemo, useState} from 'react'
import styles from '../styles/ToDoList.module.css'
import {AppContext} from '../contexts/AppContext'
import {List, Item} from '../types'
import {AddItem} from '../components/AddItem'
import {markFinished, deleteItem} from '../utlls/comm'
import {Title} from '../components/Title'

export default function ToDoList() {
  const router = useRouter()
  const listId: string = router.query.id as string
  const {lists, fetchData} = useContext(AppContext)!
  const list: List = lists[listId]
  const [filter, setFilter] = useState<'all' | 'active' | 'finished'>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const items: Item[] = useMemo(() => {
    if (!list) return []
    let res = list.items
    if (filter !== 'all') {
      res = res.filter((item: Item) => {
        if (filter === 'active' && !item.finished) return true
        if (filter === 'finished' && item.finished) return true
        return false
      })
    }
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      res = res.filter((item: Item) => {
        if (
          item.title.toLowerCase().includes(lowercaseQuery) ||
          item.description.toLowerCase().includes(lowercaseQuery)
        ) return true
        return false
      })
    }
    return res
  }, [list, filter, searchQuery])
  
  if (!list) return (<div>Loading...</div>)
  
  const onFinishedClicked = (itemId: string) => async () => {
    await markFinished(listId, itemId)
    await fetchData()
  }
  const onDeleteClicked = (itemId: string) => async () => {
    await deleteItem(listId, itemId)
    await fetchData()
  }
  const onFilterChange = (event: any) => {
    setFilter(event.target.value)
  }

  return (
    <div className={`h-full overflow-y-auto px-4 gap-1 ${styles.content}`}>
      <Title value={list.title} />
      <div className="grid grid-cols-2 gap-2">
        <select className="select select-bordered w-full max-w-xs" value={filter} onChange={onFilterChange}>
          <option value="all">Show All</option>
          <option value="active">Active</option>
          <option value="finished">Finished</option>
        </select>
        <input
          placeholder="Search Query"
          type="text"
          className="input input-bordered w-full max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-y-auto flex flex-col gap-4 px-4 items-center">
        {items.map((item: Item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl w-full lg:w-1/2">
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <div>Status: {item.finished ? "Finished" : "To Do"}</div>
              <div>Deadline: {item.deadline}</div>
              <div> <p className="whitespace-pre-line">{item.description}</p></div>
              <div className="card-actions justify-end">
                {!item.finished && <button onClick={onFinishedClicked(item.id)} className="btn btn-success">Mark as finished</button>}
                <button onClick={onDeleteClicked(item.id)} className="btn btn-error">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <AddItem listId={listId} />
      </div>
    </div>
  )
}
