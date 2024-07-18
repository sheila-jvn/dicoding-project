import { ManualForm } from "@/components/add/ManualForm"
import { UploadQR } from "@/components/add/UploadQR"
import { Button } from "@/components/ui/button"
import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

export const Route = createFileRoute("/_layout/add")({
  component: Add,
})

function Add() {
  return (
    <>
      <div className="flex w-full items-center gap-4 rounded-lg border border-border p-6">
        <Button asChild variant="secondary">
          <Link to="/">
            <ArrowLeft />
          </Link>
        </Button>
        <p className="text-xl font-semibold">Add a new 2FA</p>
      </div>

      <UploadQR />
      <ManualForm />
    </>
  )
}
