import Link from 'next/link'

export const Topbar = () => {
  return (
    <div className="navbar bg-base-100">
      <Link className="btn btn-ghost normal-case text-xl" href="/">ToDo App</Link>
    </div>
  )
}