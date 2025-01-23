import { ErrorMessage } from "@/components/custom/error"
import { Loader } from "@/components/custom/loader"
import axios from "axios"
import { useParams } from "wouter"
import { EntityForm } from "./entity-form"
import { getEntityQueryOptions, useEntity } from "../api/get-entity"
import { useEditEntity } from "../api/edit-entity"

export function EntityEditPage() {
  const { id = "0" } = useParams()

  const { data, error } = useEntity({
    entityId: parseInt(id),
    queryConfig: getEntityQueryOptions(parseInt(id)),
  })

  const { mutate, isPending } = useEditEntity({
    entityId: parseInt(id),
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
    <div className="max-w-xl">
      <EntityForm
        onSubmit={mutate}
        defaultValues={data.data}
        disabled={isPending}
      />
    </div>
  )
}
