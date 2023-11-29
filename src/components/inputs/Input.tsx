import { classNames } from "@/lib/utils"
import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftSection?: React.ReactNode
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", leftSection, label, ...props }, ref) => {
    return (
      <div>
        {!!label && (
          <label
            htmlFor={props.name}
            className="block text-sm font-medium leading-6"
          >
            {label}
          </label>
        )}
        <div
          className={classNames(
            "relative rounded-md shadow-sm",
            !!label ? "mt-2" : ""
          )}
        >
          {!!leftSection && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {leftSection}
            </div>
          )}
          <input
            type={type}
            className={classNames(
              "block outline-none w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6 dark:bg-[#25262b] dark:ring-[#373a40] focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-600",
              !!leftSection ? "pl-10" : "pl-2"
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
