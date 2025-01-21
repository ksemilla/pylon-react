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
import { Entity } from "@/types/entity"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface EntityForm {
  defaultValues?: Entity
  onSubmit: (entity: Entity) => void
  disabled?: boolean
}

const formEntitySchema = z.object({
  name: z.string().min(1, { message: "This is required" }),
  slug: z.string(),
})

export function EntityForm(props: EntityForm) {
  const form = useForm<z.infer<typeof formEntitySchema>>({
    resolver: zodResolver(formEntitySchema),
    defaultValues: props.defaultValues ?? {
      name: "",
      slug: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formEntitySchema>) => {
    props.onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <fieldset disabled={props.disabled}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>{props.defaultValues ? "Update" : "Create"}</Button>
        </fieldset>
      </form>
    </Form>
  )
}
