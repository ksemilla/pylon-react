import { UserForm } from "@/forms/user-form"

export function UserCreate() {
  return (
    <div>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Create New User
      </h4>
      <UserForm />
    </div>
  )
}
