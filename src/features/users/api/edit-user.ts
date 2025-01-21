import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"

import { api } from "@/lib/api-client"

import { User } from "@/types/users"
import axios, { AxiosResponse } from "axios"
import { log } from "@/lib/utils"
import { getUserQueryOptions } from "./get-user"
import { useToast } from "@/hooks/use-toast"

export const editUser = ({
  userId,
  data,
}: {
  userId: number
  data: Partial<User>
}) => {
  return api.put<User>(`users/${userId}/`, data)
}

type UseEditUserOptions = {
  userId: number
  mutationConfig?: UseMutationOptions<
    AxiosResponse<User, any>,
    Error,
    User,
    unknown
  >
}

export const useEditUser = ({
  userId,
  mutationConfig = {},
}: UseEditUserOptions) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { onSuccess, onError, ...restConfig } = mutationConfig

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUserQueryOptions(userId).queryKey,
      })
      onSuccess?.(...args)
    },
    onError: (err, variables, context) => {
      log(err)
      onError?.(err, variables, context)
      toast({
        title: "Error updating user",
        description: axios.isAxiosError(err) ? err.response?.data.detail : "",
        variant: "destructive",
      })
    },
    ...restConfig,
    mutationFn: (data: User) => editUser({ userId, data }),
  })
}
