import { Route, Switch } from "wouter"
import { AuthContainer } from "./containers/authContainer"
import { BaseContainer } from "./containers/baseContainer"
import { HomePage } from "./views/home/Home"
import { UserList } from "./views/users/UserList"
import { LoginPage } from "./views/auth/Login"
import { Signup } from "./views/auth/Signup"

export function Routes() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage}></Route>
      <Route path="/sign-up" component={Signup}></Route>
      <AuthContainer>
        <BaseContainer>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
        </BaseContainer>
      </AuthContainer>
    </Switch>
  )
}
