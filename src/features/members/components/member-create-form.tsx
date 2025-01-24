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
import { MemberRole } from "@/types/entity"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export type MemberCreateValues = {
  email: string
  role: (typeof MemberRole)[keyof typeof MemberRole]
}

interface MemberCreateForm {
  onSubmit: (val: MemberCreateValues) => void
  disabled?: boolean
}

const formMemberCreateSchema = z.object({
  email: z.string().email({ message: "Input valid email" }),
  role: z.enum([MemberRole.ADMIN, MemberRole.USER]),
})

export function MemberCreateForm(props: MemberCreateForm) {
  const form = useForm<z.infer<typeof formMemberCreateSchema>>({
    resolver: zodResolver(formMemberCreateSchema),
    defaultValues: {
      email: "",
      role: MemberRole.USER,
    },
  })

  const onSubmit = (values: z.infer<typeof formMemberCreateSchema>) => {
    props.onSubmit(values as MemberCreateValues)
  }

  return (
    <Form {...form}>
      <form
        aria-label="member-create-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
              <FormItem className="col-span-4">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={MemberRole.USER}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={MemberRole.USER}>
                      {MemberRole.USER.toLocaleUpperCase()}
                    </SelectItem>
                    <SelectItem value={MemberRole.ADMIN}>
                      {MemberRole.ADMIN.toLocaleUpperCase()}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button className="col-span-12">Create</Button>
        </fieldset>
      </form>
    </Form>
  )
}
