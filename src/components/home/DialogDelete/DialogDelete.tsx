import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { useRouter } from "@tanstack/react-router"
import { Trash } from "lucide-react"

export function DialogDelete() {
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          <Trash className="mr-2 h-4 w-4" /> Delete Database
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. You will lose all of your OTPs and
            have to setup a new database.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={async () => {
              auth.password = undefined
              await db.setRaw("")

              await router.invalidate()

              return router.navigate({ to: "/setup" })
            }}
          >
            Yes, I understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
