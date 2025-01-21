export const paths = {
  auth: {
    login: {
      path: "/login",
      getHref: (redirectTo?: string) =>
        `~/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    signup: {
      path: "/sign-up",
      getHref: (redirectTo?: string) =>
        `~/sign-up${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
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
      getHref: (id: string) => `~/entity/${id}`,
    },
    create: {
      path: "/create",
      getHref: () => "~/entities/create",
    },
  },

  home: {
    path: "/",
    getHref: () => "/",
  },
}
