import { Route, Switch } from "wouter"
import { AuthContainer } from "@/features/auth/components/auth-container"
import { BaseContainer } from "@/containers/BaseContainer"
import { HomePage } from "@/features/home/Home"
import { LoginPage } from "@/features/auth/components/login-page"
import { EntityContainer } from "@/containers/EntityContainer"
import { EntityCreate } from "@/features/entities/EntityCreate"
import { EntityList } from "@/features/entities/EntityList"
import { EntityEdit } from "@/features/entities/EntityEdit"
import { SignupPage } from "@/features/auth/components/sign-up-page"
import { UserListPage } from "@/features/users/components/user-list"
import { UserCreatePage } from "@/features/users/components/user-create"
import { UserEditPage } from "@/features/users/components/user-edit"

import { paths } from "@/config/paths"
import { UserLayout } from "./features/users/components/user-layout"

export function Routes() {
  return (
    <Switch>
      <Route path={paths.auth.login.path} component={LoginPage}></Route>
      <Route path={paths.auth.signup.path} component={SignupPage}></Route>
      <AuthContainer>
        <BaseContainer>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path={paths.users.list.path} nest>
            <UserLayout>
              <Switch>
                <Route path="/">
                  <UserListPage />
                </Route>
                <Route path="/create">
                  <UserCreatePage />
                </Route>
                <Route path=":id">
                  <UserEditPage />
                </Route>
              </Switch>
            </UserLayout>
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
