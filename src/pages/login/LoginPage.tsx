import { login } from "@/api/auth"
import { ActionButton } from "@/components/buttons/ActionButton"
import { Button } from "@/components/buttons/Button"
import { Form } from "@/components/form/Form"
import { TextInput } from "@/components/inputs/TextInput"
import { useToast } from "@/components/toast/use-toast"
import { useAuthStore } from "@/stores/auth"
import { LoginData } from "@/types/auth"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export function LoginPage() {
  const { isLogged, login: authStoreLogin } = useAuthStore()
  const { toast } = useToast()
  const navigate = useNavigate()

  const methods = useForm<LoginData>()

  const mutate = useMutation({
    mutationFn: async (data: LoginData) => {
      return login(data).then((res) => res.data)
    },
    onSuccess: (user) => {
      authStoreLogin(user)
      toast({
        title: "User login!",
      })
    },
    onError: (response) => {
      console.log("nag error", response)
    },
  })

  useEffect(() => {
    isLogged && navigate("/dashboard")
  }, [isLogged])

  return (
    <div className="max-w-xs m-auto">
      <h2 className="pt-10 pb-6 text-center text-2xl font-bold leading-9 tracking-tight">
        Login to your account
      </h2>
      <Form {...methods} onSubmit={mutate.mutate}>
        <div className="space-y-4">
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
          <ActionButton>
            <Button loading={mutate.isPending}>Submit</Button>
          </ActionButton>
        </div>
      </Form>
      <button onClick={() => toast({ title: "test", itemID: "a" })}>
        test
      </button>
    </div>
  )
}
