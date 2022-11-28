import {useRouter} from 'next/router'
import {useContext, useMemo, useState} from 'react'
import {AppContext} from '../contexts/AppContext'
import {List, Item} from '../types'
import {AddItem} from '../components/AddItem'
import {markFinished, deleteItem} from '../utlls/comm'

export default function ToDoList() {
  const router = useRouter()
  const listId: string = router.query.id as string
  const {lists, fetchData} = useContext(AppContext)!
  const list: List = lists[listId]
  const [filter, setFilter] = useState<'all' | 'active' | 'finished'>('all')

  const items: Item[] = useMemo(() => {
    if (!list) return []
    return list.items.filter((item: Item) => {
      if (filter === 'all') return true
      if (filter === 'active' && !item.finished) return true
      if (filter === 'finished' && item.finished) return true
      return false
    })
  }, [lists, filter, listId])
  
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
    <div className="grid grid-rows-18 max-h-screen px-4">
      <div>
        <h1 className="text-3xl font-bold underline row-span-1">
          {list.title}
        </h1>
        <select className="select select-bordered w-full max-w-xs" value={filter} onChange={onFilterChange}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="finished">Finished</option>
        </select>
      </div>
      <div className="overflow-y-auto row-span-15">
      {items.map((item: Item) => (
        <div key={item.id} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <div>Status: {item.finished ? "Finished" : "To Do"}</div>
            <div>Deadline: {item.deadline}</div>
            <div>{item.description}</div>
            <div className="card-actions justify-end">
              <button onClick={onDeleteClicked(item.id)} className="btn btn-primary">Delete</button>
              {!item.finished && <button onClick={onFinishedClicked(item.id)} className="btn btn-primary">Mark as finished</button>}
            </div>
          </div>
        </div>
      ))}
      </div>
      <div className="row-span-2">
        <AddItem listId={listId} />
      </div>
    </div>
  )
}
