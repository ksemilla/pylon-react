import { UserForm } from "./user-form"
import { User } from "@/types/users"
import { useCreateUser } from "../api/create-user"

export function UserCreatePage() {
  const { mutate } = useCreateUser()

  const onSubmit = async (values: User) => {
    mutate(values)
  }

  return (
    <div className="max-w-xl">
      <UserForm onSubmit={onSubmit} />
    </div>
  )
}
