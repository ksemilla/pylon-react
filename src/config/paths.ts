export const paths = {
  auth: {
    login: {
      path: "/login",
      getHref: (redirectTo?: string) =>
        `/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
  },
}
