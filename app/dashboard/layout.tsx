import { auth } from "@/server/auth"
import { BarChart, Package, PenSquare, Settings, Truck } from "lucide-react"

import DashboardNav from "@/components/navigation/DashbordNav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  const userLinks = [
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: <Truck size={20} />,
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <Settings size={20} />,
    },
  ] as const

  const adminLinks =
    session?.user.role === "admin"
      ? [
        {
          label: "Analytics",
          path: "/dashboard/analytics",
          icon: <BarChart size={20} />,
        },
        {
          label: "Create",
          path: "/dashboard/add-product",
          icon: <PenSquare size={20} />,
        },
        {
          label: "Products",
          path: "/dashboard/products",
          icon: <Package size={20} />,
        },
      ]
      : []

  const allLinks = [...adminLinks, ...userLinks]

  return (
    <div>
      <DashboardNav allLinks={allLinks} />

      {children}
    </div>
  )
}
