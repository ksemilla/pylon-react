import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User } from "@/types/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface UserForm {
  onSubmit: (user: Partial<User>) => void
}

const formUserSchema = z.object({
  email: z.string().email({ message: "Input valid email" }),
  firstName: z.string(),
  lastName: z.string(),
})

export function UserForm(props: UserForm) {
  const form = useForm<z.infer<typeof formUserSchema>>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formUserSchema>) => {
    props.onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button>Create</Button>
      </form>
    </Form>
  )
}
