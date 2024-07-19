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
import { db } from "@/lib/db"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  database: z.string().min(1, { message: "Database is required" }),
})

type FormData = z.infer<typeof schema>

export function ImportDatabase() {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      database: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    const { database } = data

    await db.setRaw(database)
    await router.invalidate()

    return router.navigate({ to: "/login" })
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 rounded-lg border border-border p-6"
        >
          <div className="grid gap-1">
            <h1 className="text-xl font-semibold">Import Existing Database</h1>
            <p className="text-sm text-muted-foreground">
              You can export your database and import it back into this app.
            </p>
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="database"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exported Database</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your exported database"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button>Import</Button>
        </form>
      </Form>
    </>
  )
}
