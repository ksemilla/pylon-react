type TitleProps = {
  order?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
}

export function Title(props: TitleProps) {
  const { order = 1, children } = props

  switch (order) {
    case 1:
      return <h1 className="text-3xl">{children}</h1>
    case 2:
      return <h2 className="text-2xl">{children}</h2>
    case 3:
      return <h3 className="text-xl">{children}</h3>
    case 4:
      return <h4 className="text-lg">{children}</h4>
    case 5:
      return <h5 className="text-base">{children}</h5>
    default:
      return <h6 className="text-sm">{children}</h6>
  }
}
