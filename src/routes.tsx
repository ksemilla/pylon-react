import { Route, Switch } from "wouter"
import { AuthContainer } from "@/features/auth/components/auth-container"
import { BaseContainer } from "@/containers/BaseContainer"
import { HomePage } from "@/features/home/Home"
import { LoginPage } from "@/features/auth/components/login-page"
import { EntityCreate } from "@/features/entities/EntityCreate"
import { EntityEdit } from "@/features/entities/EntityEdit"
import { SignupPage } from "@/features/auth/components/sign-up-page"
import { UserListPage } from "@/features/users/components/user-list"
import { UserCreatePage } from "@/features/users/components/user-create"
import { UserEditPage } from "@/features/users/components/user-edit"

import { paths } from "@/config/paths"
import { UserLayout } from "./features/users/components/user-layout"
import { EntityListPage } from "./features/entities/components/entity-list"
import { EntityLayout } from "./features/entities/components/entity-layout"

export function Routes() {
  return (
    <Switch>
      <Route path={paths.auth.login.path} component={LoginPage}></Route>
      <Route path={paths.auth.signup.path} component={SignupPage}></Route>
      <AuthContainer>
        <BaseContainer>
          <Route path={paths.home.path}>
            <HomePage />
          </Route>
          <Route path={paths.users.base.path} nest>
            <UserLayout>
              <Switch>
                <Route path={paths.users.list.path}>
                  <UserListPage />
                </Route>
                <Route path={paths.users.create.path}>
                  <UserCreatePage />
                </Route>
                <Route path={paths.users.single.path}>
                  <UserEditPage />
                </Route>
              </Switch>
            </UserLayout>
          </Route>
          <Route path={paths.entities.base.path} nest>
            <EntityLayout>
              <Switch>
                <Route path={paths.entities.list.path}>
                  <EntityListPage />
                </Route>
                <Route path={paths.entities.create.path}>
                  <EntityCreate />
                </Route>
                <Route path={paths.entities.single.path}>
                  <EntityEdit />
                </Route>
              </Switch>
            </EntityLayout>
          </Route>
        </BaseContainer>
      </AuthContainer>
    </Switch>
  )
}
