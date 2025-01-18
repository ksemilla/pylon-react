import { UserForm } from "./user-form"
import { useCreateUser } from "../api/create-user"

export function UserCreatePage() {
  const { mutate } = useCreateUser()

  return (
    <div className="max-w-xl">
      <UserForm onSubmit={mutate} />
    </div>
  )
}
