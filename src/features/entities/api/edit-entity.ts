import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"

import { api } from "@/lib/api-client"

import axios, { AxiosResponse } from "axios"
import { log } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Entity } from "@/types/entity"
import { getEntityQueryOptions } from "./get-entity"

export const editEntity = ({
  entityId,
  data,
}: {
  entityId: number
  data: Partial<Entity>
}) => {
  return api.put<Entity>(`entities/${entityId}/`, data)
}

type UseEditEntityOptions = {
  entityId: number
  mutationConfig?: UseMutationOptions<
    AxiosResponse<Entity, any>,
    Error,
    Entity,
    unknown
  >
}

export const useEditEntity = ({
  entityId,
  mutationConfig = {},
}: UseEditEntityOptions) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { onSuccess, onError, ...restConfig } = mutationConfig

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEntityQueryOptions(entityId).queryKey,
      })
      onSuccess?.(...args)
    },
    onError: (err, variables, context) => {
      log(err)
      onError?.(err, variables, context)
      toast({
        title: "Error updating entity",
        description: axios.isAxiosError(err) ? err.response?.data.detail : "",
        variant: "destructive",
      })
    },
    ...restConfig,
    mutationFn: (data: Entity) => editEntity({ entityId, data }),
  })
}
