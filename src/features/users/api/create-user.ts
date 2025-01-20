import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"

import { api } from "@/lib/api-client"

import { User } from "@/types/users"
import { getUsersQueryOptions } from "./get-users"
import axios, { AxiosResponse } from "axios"
import { log } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export const createUser = (data: User) => {
  return api.post<User>("users/", data)
}

type UseCreateUserOptions = {
  mutationConfig?: UseMutationOptions<
    AxiosResponse<User, any>,
    Error,
    User,
    unknown
  >
}

export const useCreateUser = ({
  mutationConfig = {},
}: UseCreateUserOptions = {}) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { onSuccess, onError, ...restConfig } = mutationConfig

  return useMutation({
    onSuccess: (...args) => {
      console.log("success")
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    onError: (err, variables, context) => {
      log(err)
      onError?.(err, variables, context)
      toast({
        title: "Error creating user",
        description: axios.isAxiosError(err) ? err.response?.data.detail : "",
        variant: "destructive",
      })
    },
    ...restConfig,
    mutationFn: createUser,
  })
}
