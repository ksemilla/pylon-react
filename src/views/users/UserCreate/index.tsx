import { UserForm } from "@/forms/user-form"

export function UserCreate() {
  const onSubmit = async () => {}

  return (
    <div>
      <UserForm onSubmit={onSubmit} />
    </div>
  )
}
