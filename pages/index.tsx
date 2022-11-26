import {useContext} from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import {AppContext} from '../contexts/AppContext'

export default function Home() {
  const {lists} = useContext(AppContext)!
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <Link href="/todolist">List</Link>
        List of Todo lists
        {JSON.stringify(lists)}
      </div>
    </>
  )
}
