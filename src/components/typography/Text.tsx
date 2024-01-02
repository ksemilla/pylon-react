import { classNames } from "@/lib/utils"
import { SizeType } from "@/types/utils"

interface TextProps {
  children?: React.ReactNode
  size?: SizeType
}

const textSize = (size: SizeType) => {
  // DEFAULT IS md

  switch (size) {
    case SizeType.XS:
      return "text-xs"
    case SizeType.SM:
      return "text-sm"
    case SizeType.LG:
      return "text-lg"
    case SizeType.XL:
      return "text-xl"
    case SizeType.XXL:
      return "text-2xl"
    default:
      return "text-base"
  }
}

export function Text(props: TextProps) {
  const { size = SizeType.MD } = props
  return (
    <p className={classNames("leading-6 text-gray-500", textSize(size))}>
      {props.children}
    </p>
  )
}
