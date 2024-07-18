import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthError } from "@/lib/db"
import { addOtp } from "@/services/otp"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const schema = z.object({
  label: z.string().min(1, { message: "Label is required" }),
  secret: z.string().min(1, { message: "Secret is required" }),
})

type FormData = z.infer<typeof schema>

export function ManualForm() {
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { label: "", secret: "" },
  })

  const onManualSubmit = async (data: FormData) => {
    try {
      await addOtp(data)
      toast.success("2FA added successfully")
      return router.navigate({ to: "/" })
    } catch (error) {
      toast.error((error as Error).message)

      if (error instanceof AuthError)
        router.navigate({ to: "/login", replace: true })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onManualSubmit)}
        className="flex w-full flex-col items-start gap-4 rounded-lg border border-border p-6"
      >
        <div className="flex flex-col gap-1">
          <p className="text-base">Add Secret Manually</p>
          <p className="text-sm text-muted-foreground">
            If you don't have a QR code, enter the secret key provided by your
            service.
          </p>
        </div>
        <div className="grid w-full gap-2">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a label" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secret</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the provided secret" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full" type="submit">
          Save
        </Button>
      </form>
    </Form>
  )
}
