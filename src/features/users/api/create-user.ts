// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { z } from "zod"

// import { api } from "@/lib/api-client"
// import { MutationConfig } from "@/lib/react-query"
// import { Discussion } from "@/types/api"

// import { getDiscussionsQueryOptions } from "./get-discussions"
// import { User } from "@/types/users"

// export const createUserInputSchema = z.object({
//   title: z.string().min(1, "Required"),
//   body: z.string().min(1, "Required"),
// })

// export type CreateDiscussionInput = z.infer<typeof createUserInputSchema>

// export const createUser = (data: User) => {
//   return api.post<User>("users/", data)
// }

// type UseCreateUserOptions = {
//   mutationConfig?: MutationConfig<typeof createDiscussion>
// }

// export const useCreateUser = ({
//   mutationConfig = {},
// }: UseCreateUserOptions = {}) => {
//   const queryClient = useQueryClient()

//   const { onSuccess, ...restConfig } = mutationConfig

//   return useMutation({
//     onSuccess: (...args) => {
//       queryClient.invalidateQueries({
//         queryKey: getDiscussionsQueryOptions().queryKey,
//       })
//       onSuccess?.(...args)
//     },
//     ...restConfig,
//     mutationFn: createUser,
//   })
// }
