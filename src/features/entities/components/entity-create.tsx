import { useCreateEntity } from "../api/create-entity"
import { EntityForm } from "./entity-form"

export function EntityCreatePage() {
  const { mutate } = useCreateEntity()

  return (
    <div className="max-w-xl">
      <EntityForm onSubmit={mutate} />
    </div>
  )
}
