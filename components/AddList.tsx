import {useContext} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {addList} from '../utlls/comm'
import {AppContext} from '../contexts/AppContext'

type FormValues = {
  title: string,
}

const schema = z.object({
  title: z.string().min(1, { message: 'Required' }),
});

export const AddList = () => {
  const {fetchData} = useContext(AppContext)!
  const {register, handleSubmit, formState: { errors }, reset} = useForm<FormValues>({resolver: zodResolver(schema)})
  const onSubmit = async (data: FormValues) => {
    await addList(data.title)
    await fetchData()
    reset()
  }
  return (
    <div className="h-full grid items-center">
      <form className="grid grid-cols-6 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-4">
          <input className="input input-bordered w-full" {...register('title')} placeholder="New list name" />
          {errors.title && <span>{errors.title.message as string}</span>}
        </div>
        <button type="submit" value="Submit" className="btn col-span-2">Add List</button>
      </form>
    </div>
  )
}
