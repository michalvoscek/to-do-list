import {useContext} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {addItem} from '../utlls/comm'
import {AppContext} from '../contexts/AppContext'
import DatePicker from 'react-datepicker'
import * as dt from 'date-fns'

type FormValues = {
  title: string,
  description: string,
  deadline: Date,
}

const schema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string(),
  deadline: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "Please insert valid date and time",
  }),
});

type AddItemProps = {
  listId: string;
};

export const AddItem = ({listId}: AddItemProps) => {
  const {fetchData} = useContext(AppContext)!
  const {register, handleSubmit, formState: {errors}, reset, control} = useForm<FormValues>({resolver: zodResolver(schema)})
  const onSubmit = async (data: FormValues) => {
    const {title, description, deadline} = data
    const deadlineString: string = dt.format(deadline, 'yyyy-MM-dd HH:mm')
    await addItem(listId, title, description, deadlineString)
    await fetchData()
    reset()
  }

  return (
    <div className="h-full grid items-center w-full lg:w-1/2">
      <form className="grid grid-flow-row gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <input className="input input-bordered w-full input-md" {...register('title')} placeholder="Title" />
          {errors.title && <span>{errors.title.message as string}</span>}
        </div>
        <div className="">
          <textarea className="textarea textarea-bordered w-full resize-none" {...register('description')} placeholder="Description" />
          {errors.description && <span>{errors.description.message as string}</span>}
        </div>
        <div className="">
        <Controller
          control={control}
          name="deadline"
          render={({field: {onChange, value}}) => (
            <DatePicker
              className="input input-bordered w-full input-md"
              placeholderText="Deadline"
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              selected={value}
              onChange={onChange}
            />
          )}
        />
          {errors.deadline && <span>{errors.deadline.message as string}</span>}
        </div>
        <button type="submit" value="Submit" className="btn">Add Item</button>
      </form>
    </div>
  )
}
