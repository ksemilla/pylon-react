import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useAuthStore } from "@/stores/auth"
import { User, UserRole } from "@/types/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface UserForm {
  defaultValues?: User
  onSubmit: (user: User) => void
  disabled?: boolean
}

const formUserSchema = z.object({
  id: z.number().optional(),
  email: z.string().email({ message: "Input valid email" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  firebaseUid: z.string().optional(),
  username: z.string().optional(),
  role: z.enum([UserRole.ADMIN, UserRole.SUPERUSER, UserRole.USER]),
  isActive: z.boolean(),
})

export function UserForm(props: UserForm) {
  const { user } = useAuthStore()
  const form = useForm<z.infer<typeof formUserSchema>>({
    resolver: zodResolver(formUserSchema),
    defaultValues: props.defaultValues ?? {
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      firebaseUid: "",
      username: "",
      role: UserRole.USER,
      isActive: true,
    },
  })

  const onSubmit = (values: z.infer<typeof formUserSchema>) => {
    props.onSubmit(values as User)
  }

  return (
    <Form {...form}>
      <form aria-label="user-form" onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={props.disabled} className="gap-4 grid grid-cols-12">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-8">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={user?.role !== UserRole.ADMIN}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.USER}>
                      {UserRole.USER.toLocaleUpperCase()}
                    </SelectItem>
                    <SelectItem value={UserRole.ADMIN}>
                      {UserRole.ADMIN.toLocaleUpperCase()}
                    </SelectItem>
                    <SelectItem value={UserRole.SUPERUSER}>
                      {UserRole.SUPERUSER.toLocaleUpperCase()}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <div>
                  <FormLabel>Is Active?</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="col-span-12">
            {props.defaultValues ? "Update" : "Create"}
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}
