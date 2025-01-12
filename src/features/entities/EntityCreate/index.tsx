import { createEntity } from "@/api/entities"
import { EntityForm } from "@/forms/entity-form"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export function EntityCreate() {
  const { mutate } = useMutation({
    mutationFn: createEntity,
    onSuccess: (res) => {
      console.log(res)
    },
    onError: (err: AxiosError) => {
      console.log(err.response)
    },
  })

  const onSubmit = (values: any) => {
    mutate(values)
  }

  return (
    <div className="max-w-md">
      <EntityForm onSubmit={onSubmit} />
    </div>
  )
}
