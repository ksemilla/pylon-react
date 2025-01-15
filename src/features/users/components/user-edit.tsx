import { editUser } from "@/api/users"
import { ErrorMessage } from "@/components/custom/error"
import { Loader } from "@/components/custom/loader"
import { UserForm } from "./user-form"
import { User } from "@/types/users"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "wouter"
import { getUserQueryOptions, useUser } from "../api/get-user"

export function UserEditPage() {
  const { id = "0" } = useParams()

  // const { data, error } = useQuery({
  //   queryKey: ["user", id],
  //   queryFn: async () => {
  //     return getUser(parseInt(id))
  //   },
  // })

  const { data, error } = useUser({
    id: parseInt(id),
    queryConfig: getUserQueryOptions(parseInt(id)),
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
