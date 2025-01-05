import { googleLogin } from "@/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { parseJwt } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { Link, Redirect, useLocation } from "wouter"
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
import { GoogleIcon } from "@/components/icons/GoogleIcon"
import { LoginForm } from "./login-form"

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

export function LoginPage2() {
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
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const accessToken = await res.user.getIdToken()
        googleLogin({ accessToken })
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
            })
          })
      })
      .catch((err) => {
        toast({
          title: "Firebase Error",
          description: err.code,
          variant: "destructive",
        })
      })
  }

  const onGoogleSubmit = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const accessToken = await res.user.getIdToken()
        googleLogin({ accessToken })
          .then((res) => {
            localStorage.setItem("accessToken", res.data.token)
            const decoded = parseJwt(res.data.token)
            authStore.setUserId((decoded?.payload as { userId: number }).userId)
          })
          .catch((err) =>
            toast({
              title: "Error logging in",
              description: err.response.data.detail,
              variant: "destructive",
            })
          )
      })
      .catch((err) => {
        toast({
          title: "Error logging in",
          description: err.response.data.detail,
          variant: "destructive",
        })
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
                Welcome back!
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
                      Login
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
                      Or login with
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button onClick={onGoogleSubmit} className="w-full">
                    <GoogleIcon />
                    Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/sign-up"
            className="text-center text-sm leading-7 [&:not(:first-child)]:mt-6 hover:text-blue-600"
          >
            No account yet? Create here.
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

export function LoginPage() {
  const [_, setLocation] = useLocation()
  const onSubmit = () => {}

  return (
    <LoginRoot>
      <LoginHeader />
      <LoginForm onSubmit={onSubmit} />
      <LoginDivider />
      <GoogleLoginSection />
      <LoginFooter />
    </LoginRoot>
  )
}

function LoginRoot({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full space-y-10 max-w-sm lg:w-96">
          {children}
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  )
}

function LoginHeader() {
  return (
    <div>
      {/* <img
    alt="Your Company"
    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
    className="h-10 w-auto"
  /> */}
      <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Welcome back!
      </h2>
    </div>
  )
}

function LoginDivider() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-sm/6 font-medium">
        <span className="bg-white px-6 text-gray-900">Or login with</span>
      </div>
    </div>
  )
}

function GoogleLoginSection() {
  const { toast } = useToast()
  const authStore = useAuthStore()
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const [_, setLocation] = useLocation()

  const onGoogleSubmit = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const accessToken = await res.user.getIdToken()
        googleLogin({ accessToken })
          .then((res) => {
            localStorage.setItem("accessToken", res.data.token)
            const decoded = parseJwt(res.data.token)
            authStore.setUserId((decoded?.payload as { userId: number }).userId)
            setLocation("/")
          })
          .catch((err) =>
            toast({
              title: "Error logging in",
              description: err.response.data.detail,
              variant: "destructive",
            })
          )
      })
      .catch((err) => {
        toast({
          title: "Error logging in",
          description: err.response.data.detail,
          variant: "destructive",
        })
      })
  }

  return (
    <Button onClick={onGoogleSubmit} className="w-full">
      <GoogleIcon />
      Google
    </Button>
  )
}

function LoginFooter() {
  return (
    <div className="text-center">
      <Link
        href="/sign-up"
        className="text-sm leading-7 [&:not(:first-child)]:mt-6 hover:text-blue-600"
      >
        No account yet? Create here.
      </Link>
    </div>
  )
}
