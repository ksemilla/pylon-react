import { login } from "@/api/auth"
import { GoogleIcon } from "@/components/icons/GoogleIcon"
import { Button } from "@/components/ui/button"
import { parseJwt } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth"
import { User } from "@/types/users"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { Link, Redirect } from "wouter"

export function LoginPage() {
  const authStore = useAuthStore()
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: "select_account" })
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const accessToken = await res.user.getIdToken()
        login({ accessToken })
          .then((res) => {
            localStorage.setItem("accessToken", res.data.token)
            const user = parseJwt(res.data.token)?.payload as User
            authStore.login(user)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (authStore.isLogged) {
    return <Redirect to="/" />
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center space-y-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Pylon
      </h1>
      <Button onClick={googleLogin}>
        <GoogleIcon /> Login with Google
      </Button>
      <Link href="/signup" className="leading-7 [&:not(:first-child)]:mt-6">
        Create account here
      </Link>
    </div>
  )
}
