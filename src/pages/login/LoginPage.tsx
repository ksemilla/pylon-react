import { login } from "@/api/auth"
import { Button } from "@/components/buttons/Button"
import { Form } from "@/components/form/Form"
import { TextInput } from "@/components/inputs/TextInput"
import { LoginData } from "@/types/auth"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export function LoginPage() {
  const methods = useForm<LoginData>()

  const mutate = useMutation({
    mutationFn: async (data: LoginData) => {
      return login(data)
    },
    onSuccess: (data) => {
      console.log("okay", data)
    },
    onError: (response) => {
      console.log("nag error", response)
    },
  })

  return (
    <div className="max-w-xs m-auto">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Login to your account
      </h2>
      <Form {...methods} onSubmit={mutate.mutate}>
        <TextInput
          autoComplete="email"
          label="Email"
          {...methods.register("email", { required: "Please enter email" })}
        />
        <TextInput
          label="Password"
          type="password"
          {...methods.register("password", {
            required: "Please enter password",
          })}
        />
        <Button radius="full" loading={mutate.isPending}>
          {mutate.isPending ? "loading" : "Submit"}
        </Button>
      </Form>
    </div>
  )
}
