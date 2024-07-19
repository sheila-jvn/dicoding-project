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
import { ArrowUpFromLine } from "lucide-react"
import { ReactNode } from "react"

interface DialogExportProps {
  raw: ReactNode
}

export function DialogExport({ raw }: DialogExportProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <ArrowUpFromLine className="mr-2 h-4 w-4" /> Export Database
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Database</DialogTitle>
          <DialogDescription>
            Copy all of the text below to a safe place / when creating a new
            database.
          </DialogDescription>
        </DialogHeader>

        <p className="w-full max-w-full break-all rounded-lg border border-border bg-background p-4 text-xs">
          {raw}
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
