import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const q = JSON.stringify(router.query)
  return (
    <div>
      Todo list {q}
    </div>
  )
}
