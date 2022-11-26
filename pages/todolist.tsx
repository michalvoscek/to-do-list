import {useRouter} from 'next/router'
import {useContext} from 'react'
import {AppContext} from '../contexts/AppContext'

export default function Home() {
  const router = useRouter()
  const {lists} = useContext(AppContext)!
  return (
    <div>
      Todo list
      {JSON.stringify(router.query)}
      {JSON.stringify(lists)}
    </div>
  )
}
