import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form"

interface FormProps<T extends FieldValues>
  extends UseFormReturn<T, any, undefined> {
  children: React.ReactNode
  onSubmit: (data: T) => void
  disabled?: boolean
}

const Form = <T extends FieldValues>({
  children,
  onSubmit,
  disabled,
  ...methods
}: FormProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
        <fieldset disabled={disabled}>{children}</fieldset>
      </form>
    </FormProvider>
  )
}

export { Form }
