import { googleLogin } from "@/api/auth"
import { Button } from "@/components/ui/button"
import { parseJwt } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  AuthError,
} from "firebase/auth"
import { Link, useLocation } from "wouter"

import { useToast } from "@/hooks/use-toast"
import { GoogleIcon } from "@/components/icons/GoogleIcon"
import { formSchema, LoginForm } from "./login-form"
import { z } from "zod"
import axios from "axios"

export function LoginPage() {
  const { toast } = useToast()
  const authStore = useAuthStore()
  const auth = getAuth()
  const [_, setLocation] = useLocation()
  const onSubmit = async (v: z.infer<typeof formSchema>) => {
    try {
      const firebaseRes = await signInWithEmailAndPassword(
        auth,
        v.email,
        v.password
      )
      console.log(firebaseRes)

      const accessToken = await firebaseRes.user.getIdToken()

      const apiRes = await googleLogin({ accessToken })

      localStorage.setItem("accessToken", apiRes.data.token)
      const decoded = parseJwt(apiRes.data.token)
      authStore.setUserId((decoded?.payload as { userId: number }).userId)
      setLocation("/")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast({
          title: "Error logging in",
          description: err.response?.data.detail,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error logging in",
          description:
            (err as AuthError).code === "auth/invalid-credential"
              ? "Invalid credentials"
              : "",
          variant: "destructive",
        })
      }
    }
  }

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
    <Button
      aria-label="google-login-btn"
      onClick={onGoogleSubmit}
      className="w-full"
    >
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
