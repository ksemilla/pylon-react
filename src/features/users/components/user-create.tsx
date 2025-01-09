import { createUser } from "@/api/users"
import { UserForm } from "./user-form"
import { log } from "@/lib/utils"
import { User } from "@/types/users"
import { useMutation } from "@tanstack/react-query"

export function UserCreatePage() {
  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (err) => {
      log(err)
    },
  })

  const onSubmit = async (values: User) => {
    mutate(values)
  }

  return (
    <div className="max-w-xl">
      <UserForm onSubmit={onSubmit} />
    </div>
  )
}
