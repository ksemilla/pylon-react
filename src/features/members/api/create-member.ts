import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"

import { api } from "@/lib/api-client"

import axios, { AxiosResponse } from "axios"
import { log } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { getMembersQueryOptions } from "./get-members"
import { Member } from "@/types/entity"
import { MemberCreateValues } from "../components/member-create-form"
import { useEntityStore } from "@/stores/entity"

export const createMember = ({
  entityId,
  data,
}: {
  entityId: number
  data: MemberCreateValues
}) => {
  return api.post<Member>(`entities/${entityId}/members/`, data)
}

export type UseCreateMemberOptions = {
  mutationConfig?: UseMutationOptions<
    AxiosResponse<Member, any>,
    Error,
    MemberCreateValues,
    unknown
  >
}

export const useCreateMember = ({
  mutationConfig = {},
}: UseCreateMemberOptions = {}) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { onSuccess, onError, ...restConfig } = mutationConfig
  const entityId = useEntityStore((state) => state.entityId) ?? 0

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getMembersQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    onError: (err, variables, context) => {
      log(err)
      onError?.(err, variables, context)
      toast({
        title: "Error creating member",
        description: axios.isAxiosError(err) ? err.response?.data.detail : "",
        variant: "destructive",
      })
    },
    ...restConfig,
    mutationFn: (data: MemberCreateValues) => createMember({ entityId, data }),
  })
}
