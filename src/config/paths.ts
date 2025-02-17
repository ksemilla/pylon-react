export const paths = {
  auth: {
    login: {
      path: "/login",
      getHref: (redirectTo?: string) =>
        `~/login${
          redirectTo &&
          redirectTo !== "/" &&
          redirectTo !== "/login" &&
          redirectTo !== "/sign-up"
            ? `?redirectTo=${encodeURIComponent(redirectTo)}`
            : ""
        }`,
    },
    signup: {
      path: "/sign-up",
      getHref: (redirectTo?: string) =>
        `~/sign-up${
          redirectTo &&
          redirectTo !== "/" &&
          redirectTo !== "/login" &&
          redirectTo !== "/sign-up"
            ? `?redirectTo=${encodeURIComponent(redirectTo)}`
            : ""
        }`,
    },
  },

  home: {
    path: "/",
    getHref: () => "/",
  },

  users: {
    base: {
      path: "/users",
      getHref: () => "/users",
    },
    list: {
      path: "/",
      getHref: () => "~/users",
    },
    single: {
      path: "/:id",
      getHref: (id: string) => `/user/${id}`,
    },
    create: {
      path: "/create",
      getHref: () => "~/users/create",
    },
  },

  entities: {
    base: {
      path: "/entities",
      getHref: () => "/entities",
    },
    list: {
      path: "/",
      getHref: () => "~/entities",
    },
    single: {
      path: "/:id",
      getHref: (id: string) => `~/entities/${id}`,
    },
    create: {
      path: "/create",
      getHref: () => "~/entities/create",
    },
  },

  members: {
    base: {
      path: "/members",
      getHref: () => "/members",
    },
    list: {
      path: "/",
      getHref: () => "~/members",
    },
    single: {
      path: "/:id",
      getHref: (id: string) => `~/members/${id}`,
    },
    create: {
      path: "/create",
      getHref: () => "~/members/create",
    },
  },
}
