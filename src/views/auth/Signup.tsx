import { googleSignUp, signUp } from "@/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { log, parseJwt } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { Link, Redirect } from "wouter"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Enter valid email",
    })
    .min(4, { message: "Minumum of 4 characters" })
    .max(50, { message: "Maximum of 50 characters" }),
  password: z
    .string()
    .min(4, { message: "Minimum of 4 characters" })
    .max(50, { message: "Maximum of 50 characters" }),
})

export function Signup() {
  const { toast } = useToast()
  const authStore = useAuthStore()
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signUp(values)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.token)
        const decoded = parseJwt(res.data.token)
        authStore.setUserId((decoded?.payload as { userId: number }).userId)
      })
      .catch((err) => {
        toast({
          title: "Error creating user",
          description: err.response.data.detail,
          variant: "destructive",
          duration: 10000,
        })
      })
  }

  const onGoogleSubmit = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const accessToken = await res.user.getIdToken()
        googleSignUp({ accessToken })
          .then((res) => {
            localStorage.setItem("accessToken", res.data.token)
            const decoded = parseJwt(res.data.token)
            authStore.setUserId((decoded?.payload as { userId: number }).userId)
          })
          .catch((err) => {
            toast({
              title: "Error creating user",
              description: err.response.data.detail,
              variant: "destructive",
              duration: 10000,
            })
          })
      })
      .catch((err) => {
        log(err.response)
      })
  }

  if (authStore.isLogged) {
    return <Redirect to="/" />
  }

  return (
    <>
      <div className="flex min-h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              {/* <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-10 w-auto"
              /> */}
              <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Welcome to Pylon!
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm/6 font-medium">
                    <span className="bg-white px-6 text-gray-900">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button onClick={onGoogleSubmit} className="w-full">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>{" "}
                    Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/login"
            className="text-center text-sm leading-7 [&:not(:first-child)]:mt-6 hover:text-blue-600"
          >
            Already a member? Login here.
          </Link>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </>
  )
}
