import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout")({
  component: Layout,
})

function Layout() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <Outlet />
    </div>
  )
}
