import { Route, Switch } from "wouter"
import { AuthContainer } from "./containers/AuthContainer"
import { BaseContainer } from "./containers/BaseContainer"
import { HomePage } from "./views/home/Home"
import { UserList } from "./views/users/UserList"
import { LoginPage } from "./views/auth/Login"
import { Signup } from "./views/auth/Signup"
import { UserCreate } from "./views/users/UserCreate"
import { UserContainer } from "./containers/UserContainer"
import { EntityContainer } from "./containers/EntityContainer"
import { EntityCreate } from "./views/entities/EntittyCreate"
import { EntityList } from "./views/entities/EntityList"
import { UserEdit } from "./views/users/UserEdit"

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
