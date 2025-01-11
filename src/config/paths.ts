export const paths = {
  auth: {
    login: {
      path: "/login",
      getHref: (redirectTo?: string) =>
        `/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    signup: {
      path: "/sign-up",
      getHref: (redirectTo?: string) =>
        `/sign-up${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
  },

  users: {
    list: {
      path: "/users",
      getHref: () => "/users",
    },
    single: {
      path: "/user/:id",
      getHref: (id: string) => `/user/${id}`,
    },
    create: {
      path: "/users/create",
      getHref: () => "/users/create",
    },
  },

  home: {
    path: "/",
    getHref: () => "/",
  },
}
