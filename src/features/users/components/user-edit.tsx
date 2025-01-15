import { ErrorMessage } from "@/components/custom/error"
import { Loader } from "@/components/custom/loader"
import { UserForm } from "./user-form"
import { User } from "@/types/users"
import axios from "axios"
import { useParams } from "wouter"
import { getUserQueryOptions, useUser } from "../api/get-user"
import { useEditUser } from "../api/edit-user"

export function UserEditPage() {
  const { id = "0" } = useParams()

  const { data, error } = useUser({
    id: parseInt(id),
    queryConfig: getUserQueryOptions(parseInt(id)),
  })

  const { mutate, isPending } = useEditUser({
    userId: parseInt(id),
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
