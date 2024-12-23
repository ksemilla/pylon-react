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
  onSubmit: (entity: FormData) => void
}

const formEntitySchema = z.object({
  name: z.string(),
  slug: z.string(),
  photo: z.instanceof(FileList).optional(),
  icon: z.instanceof(FileList).optional(),
})

export function EntityForm(props: EntityForm) {
  const form = useForm<z.infer<typeof formEntitySchema>>({
    resolver: zodResolver(formEntitySchema),
    defaultValues: props.defaultValues ?? {
      name: "",
      slug: "",
    },
  })

  const photoRef = form.register("photo")
  const iconRef = form.register("icon")

  const onSubmit = (values: z.infer<typeof formEntitySchema>) => {
    const formData = new FormData()
    formData.append("name", values.name)
    if (values.photo) {
      formData.append("photo", values.photo[0])
    }
    if (values.icon) {
      formData.append("icon", values.icon[0])
    }
    props.onSubmit(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormItem>
          <FormLabel>Photo</FormLabel>
          <FormControl>
            <Input
              type="file"
              {...photoRef}
              // onChange={(e) => form.setValue("photo", e.target.files?.[0])}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Icon</FormLabel>
          <FormControl>
            <Input type="file" {...iconRef} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button>Create</Button>
      </form>
    </Form>
  )
}
