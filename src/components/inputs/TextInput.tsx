import { classNames } from "@/lib/utils"
import { ErrorMessage } from "@hookform/error-message"
import * as React from "react"
import { useFormContext } from "react-hook-form"

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftSection?: React.ReactNode
  label?: string
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    { className = "", type = "text", leftSection, label, id, ...props },
    ref
  ) => {
    const {
      formState: { errors },
    } = useFormContext()

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
            !!label ? "mt-1" : ""
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
              "block outline-none w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 dark:bg-white/5 dark:ring-white/10 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500",
              !!leftSection ? "pl-10" : "pl-2",
              !!errors[props.name ?? ""]
                ? "ring-red-500 focus:ring-red-600 dark:ring-red-500 dark:focus:ring-red-500"
                : ""
            )}
            ref={ref}
            id={props.name}
            {...props}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name={props.name ?? ""}
          render={({ message, messages }) => {
            if (!!messages) {
              return (
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="text-xs">
                    {message}
                  </p>
                ))
              )
            }
            return <p className="text-sm text-red-500">{message}</p>
          }}
        />
      </div>
    )
  }
)
TextInput.displayName = "TextInput"

export { TextInput }
