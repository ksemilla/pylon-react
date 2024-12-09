import { Route, Switch } from "wouter"
import { LoginPage } from "./views/login/Login"
import { AuthContainer } from "./containers/authContainer"
import { BaseContainer } from "./containers/baseContainer"
import { HomePage } from "./views/home/Home"

export function Routes() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage}></Route>
      <AuthContainer>
        <BaseContainer>
          <Route path="/">
            <HomePage />
          </Route>
          <Route>Not Found</Route>
        </BaseContainer>
      </AuthContainer>
    </Switch>
  )
}
