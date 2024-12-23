import { editUser, getUser } from "@/api/users"
import { ErrorMessage } from "@/components/custom/error"
import { Loader } from "@/components/custom/loader"
import { UserForm } from "@/forms/user-form"
import { User } from "@/types/users"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "wouter"

export function UserEdit() {
  const { id = "0" } = useParams()

  const { data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      return getUser(parseInt(id))
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: User) => {
      return editUser(parseInt(id), data)
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const onSubmit = (user: User) => {
    mutate(user)
  }

  console.log(data?.data)

  if (axios.isAxiosError(error)) {
    return (
      <ErrorMessage title="Error" messages={[error.response?.data.detail]} />
    )
  }

  if (!data) {
    return <Loader />
  }

  return (
    <div className="max-w-xl">
      <UserForm
        onSubmit={onSubmit}
        defaultValues={data.data}
        disabled={isPending}
      />
    </div>
  )
}
