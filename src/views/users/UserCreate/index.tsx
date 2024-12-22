import { UserForm } from "@/forms/user-form"
import { User } from "@/types/users"

export function UserCreate() {
  const onSubmit = async (values: User) => {
    console.log("xxxx", values)
  }

  return (
    <div className="max-w-md">
      <UserForm onSubmit={onSubmit} />
    </div>
  )
}
