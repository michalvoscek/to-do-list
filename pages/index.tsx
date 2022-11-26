import {useContext} from 'react'
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.css'
import {AppContext} from '../contexts/AppContext'
import {List} from '../types'

export default function Home() {
  const router = useRouter()
  const {lists} = useContext(AppContext)!
  const onClick = (id: string) => () => {
    router.push(`/todolist?id=${id}`)
  }
  return (
    <>
      <div className="grid grid-rows-16 divide-y max-h-screen overflow-y-auto">
        <h1 className="text-3xl font-bold underline row-span-1">
          List of lists
        </h1>
        <div className="overflow-y-auto row-span-13">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-center">Tasks #</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((list: List) => (
                <tr key={list.id} onClick={onClick(list.id)} className="hover cursor-pointer">
                  <th>{list.title}</th>
                  <th className="text-center">{list.items.length}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row-span-1">
          form
        </div>
      </div>
    </>
  )
}
