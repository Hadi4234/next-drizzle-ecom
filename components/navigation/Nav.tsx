import { auth } from "@/server/auth"
import { UserButton } from "./UserButton";
import Link from "next/link";
import Logo from "./logo";
import CartDrawer from "@/components/cart/cart-drawer";
import { Button } from "@/components/ui/button";
import { FcElectricalSensor } from "react-icons/fc";


export default async function Nav() {
  const session = await auth();

  return (
    <div className="py-8">
      <nav>
        <ul className="flex justify-between items-center md:gap-8 gap-4">
          <li className="flex flex-1">
            <Link href="/" className="font-bold text-xl font-serif flex flex-row"><span className="text-primary mr-1">Unique</span>Shop<span><FcElectricalSensor className="w-6 h-6" /></span></Link></li>
          <li className="relative flex items-center hover:bg-muted">
            <CartDrawer />
          </li>
          {!session ? (
            <li className="flex items-center justify-center">
              <Button>
                <Link aria-label="sign-in" href={"/auth/login"}>
                  login
                </Link>
              </Button>
            </li>
          ) : (
            <li className="flex items-center justify-center">
              <UserButton expires={session?.expires} user={session?.user} />
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}