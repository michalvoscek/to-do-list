import {useContext} from 'react'
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.css'
import {AppContext} from '../contexts/AppContext'
import {List} from '../types'
import {AddList} from '../components/AddList'
import {Title} from '../components/Title'

export default function Home() {
  const router = useRouter()
  const {lists, listsOrder} = useContext(AppContext)!
  const onClick = (id: string) => () => {
    router.push(`/todolist?id=${id}`)
  }
  return (
    <div className={`px-4 h-full overflow-y-auto ${styles.content}`}>
      <Title value="List of lists" />
      <div className="overflow-y-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th className="text-center">Tasks #</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {listsOrder.map((id: string) => {
              const list: List = lists[id]
              return (
              <tr key={id} onClick={onClick(id)} className="hover cursor-pointer">
                <th>{list.title}</th>
                <th className="text-center">{list.items.length}</th>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
      <div>
        <AddList />
      </div>
    </div>
  )
}
