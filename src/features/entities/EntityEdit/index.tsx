import { editEntity, getEntity } from "@/api/entities"
import { ErrorMessage } from "@/components/custom/error"
import { Loader } from "@/components/custom/loader"
import { EntityForm } from "@/forms/entity-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "wouter"

export function EntityEdit() {
  const { id = "0" } = useParams()

  const { data, error } = useQuery({
    queryKey: ["entity", id],
    queryFn: async () => getEntity(parseInt(id)),
  })

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => {
      return editEntity(parseInt(id), data)
    },
  })

  if (axios.isAxiosError(error)) {
    return (
      <ErrorMessage title="Error" messages={[error.response?.data.detail]} />
    )
  }

  if (!data) {
    return <Loader />
  }

  return (
    <EntityForm
      defaultValues={data.data}
      onSubmit={(entity) => mutate(entity)}
    />
  )
}
