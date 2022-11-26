import {useForm} from 'react-hook-form'


export const AddList = () => {
  const {register, handleSubmit, watch, formState: {errors}} = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="h-full grid items-center">
      <form className="grid grid-cols-6 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input className="input input-bordered w-full col-span-4" {...register('title', { required: true })} />
        {errors.titleRequired && <span>This field is required</span>}
        <button type="submit" value="Submit" className="btn col-span-2">Add List</button>
      </form>
    </div>
  )
}
