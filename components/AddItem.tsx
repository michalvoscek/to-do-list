import {useContext} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {addItem} from '../utlls/comm'
import {AppContext} from '../contexts/AppContext'

const schema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string(),
  deadline: z.string().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/, 'Required format: YYYY-MM-DD HH:MM'),
});

type AddItemProps = {
  listId: string;
};

export const AddItem = ({listId}: AddItemProps) => {
  const {fetchData} = useContext(AppContext)!
  const {register, handleSubmit, formState: { errors }, reset} = useForm({resolver: zodResolver(schema)})
  const onSubmit = async (data: any) => {
    const {title, description, deadline} = data
    await addItem(listId, title, description, deadline)
    await fetchData()
    reset()
  }
  return (
    <div className="h-full grid items-center">
      <form className="grid grid-flow-row gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <input className="input input-bordered w-full input-md" {...register('title')} placeholder="Title" />
          {errors.title && <span>{errors.title.message as string}</span>}
        </div>
        <div className="">
          <textarea className="textarea textarea-bordered w-full" {...register('description')} placeholder="Description" />
          {errors.description && <span>{errors.description.message as string}</span>}
        </div>
        <div className="">
          <input className="input input-bordered w-full input-md" {...register('deadline')} placeholder="Deadline" />
          {errors.deadline && <span>{errors.deadline.message as string}</span>}
        </div>
        <button type="submit" value="Submit" className="btn">Add List</button>
      </form>
    </div>
  )
}