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
import { getEntitiesQueryOptions } from "./get-entities"
import { useLocation } from "wouter"
import { paths } from "@/config/paths"

export const createEntity = (data: Entity) => {
  return api.post<Entity>("entities/", data)
}

export type UseCreateEntityOptions = {
  mutationConfig?: UseMutationOptions<
    AxiosResponse<Entity, any>,
    Error,
    Entity,
    unknown
  >
}

export const useCreateEntity = ({
  mutationConfig = {},
}: UseCreateEntityOptions = {}) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { onSuccess, onError, ...restConfig } = mutationConfig
  const [_, setLocation] = useLocation()

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEntitiesQueryOptions().queryKey,
      })
      onSuccess?.(...args)
      const [data] = args
      setLocation(paths.entities.single.getHref(JSON.stringify(data.data.id)))
    },
    onError: (err, variables, context) => {
      log(err)
      onError?.(err, variables, context)
      toast({
        title: "Error creating entity",
        description: axios.isAxiosError(err) ? err.response?.data.detail : "",
        variant: "destructive",
      })
    },
    ...restConfig,
    mutationFn: createEntity,
  })
}
