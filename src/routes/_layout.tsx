import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout")({
  component: Layout,
})

function Layout() {
  return (
    <div className="mx-auto grid max-w-md gap-6 px-6 py-16">
      <Outlet />
    </div>
  )
}
