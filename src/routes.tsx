import { Route, Switch } from "wouter"
import { AuthContainer } from "./containers/AuthContainer"
import { BaseContainer } from "./containers/BaseContainer"
import { HomePage } from "./features/home/Home"
import { UserList } from "./features/users/UserList"
import { LoginPage } from "./features/auth/login/components/login-page"
import { Signup } from "./features/auth/signup"
import { UserCreate } from "./features/users/UserCreate"
import { UserContainer } from "./containers/UserContainer"
import { EntityContainer } from "./containers/EntityContainer"
import { EntityCreate } from "./features/entities/EntittyCreate"
import { EntityList } from "./features/entities/EntityList"
import { UserEdit } from "./features/users/UserEdit"
import { EntityEdit } from "./features/entities/EntityEdit"

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
              <Switch>
                <Route path="/">
                  <UserList />
                </Route>
                <Route path="/create">
                  <UserCreate />
                </Route>
                <Route path=":id">
                  <UserEdit />
                </Route>
              </Switch>
            </UserContainer>
          </Route>
          <Route path="/entities" nest>
            <EntityContainer>
              <Switch>
                <Route path="/">
                  <EntityList />
                </Route>
                <Route path="/create">
                  <EntityCreate />
                </Route>
                <Route path=":id">
                  <EntityEdit />
                </Route>
              </Switch>
            </EntityContainer>
          </Route>
        </BaseContainer>
      </AuthContainer>
    </Switch>
  )
}
