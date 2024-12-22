import { Route, Switch } from "wouter"
import { AuthContainer } from "./containers/authContainer"
import { BaseContainer } from "./containers/baseContainer"
import { HomePage } from "./views/home/Home"
import { UserList } from "./views/users/UserList"
import { LoginPage } from "./views/auth/Login"
import { Signup } from "./views/auth/Signup"
import { UserCreate } from "./views/users/UserCreate"
import { UserContainer } from "./containers/UserContainer"
import { EntityContainer } from "./containers/EntityContainer"
import { EntityCreate } from "./views/entities/EntittyCreate"
import { EntityList } from "./views/entities/EntityList"

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
          <Route path="/users" nest>
            <UserContainer>
              <Route path="/">
                <UserList />
              </Route>
              <Route path="/create">
                <UserCreate />
              </Route>
            </UserContainer>
          </Route>
          <Route path="/entities" nest>
            <EntityContainer>
              <Route path="/">
                <EntityList />
              </Route>
              <Route path="/create">
                <EntityCreate />
              </Route>
            </EntityContainer>
          </Route>
        </BaseContainer>
      </AuthContainer>
    </Switch>
  )
}
