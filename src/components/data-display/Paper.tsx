import { classNames } from "@/lib/utils"
import * as React from "react"

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  withPadding?: boolean
}

const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  ({ className = "", withPadding = true, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames(
        "rounded-xl border border-[#373a40] bg-card text-card-foreground shadow",
        withPadding ? "p-2" : "",
        className
      )}
      {...props}
    />
  )
)
Paper.displayName = "Paper"

export { Paper }
