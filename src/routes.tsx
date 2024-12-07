import { Route, Switch } from "wouter"
import { LoginPage } from "./views/login/Login"
import { AuthContainer } from "./containers/authContainer"
import { BaseContainer } from "./containers/baseContainer"

export function Routes() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage}></Route>
      <AuthContainer>
        <BaseContainer>
          <Route path="/">home page</Route>
        </BaseContainer>
      </AuthContainer>
      <Route>test</Route>
    </Switch>
  )
}
