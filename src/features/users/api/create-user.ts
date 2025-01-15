import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"
import { z } from "zod"

import { api } from "@/lib/api-client"

import { User } from "@/types/users"
import { getUsersQueryOptions } from "./get-users"
import { AxiosResponse } from "axios"
import { log } from "console"

export const createUserInputSchema = z.object({
  title: z.string().min(1, "Required"),
  body: z.string().min(1, "Required"),
})

export type CreateDiscussionInput = z.infer<typeof createUserInputSchema>

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

  const { onSuccess, onError, ...restConfig } = mutationConfig

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    onError: (err, variables, context) => {
      log(err)
      onError?.(err, variables, context)
    },
    ...restConfig,
    mutationFn: createUser,
  })
}
