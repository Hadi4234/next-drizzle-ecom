import { auth } from "@/server/auth"
import { UserButton } from "./UserButton";
import Link from "next/link";
import Logo from "./logo";


export default async function Nav() {
  const session = await auth();
 
  return (
     <div className="py-8">
      <nav>
        <ul className="flex justify-between">
          <li><Link href="/" className="font-bold text-xl"> Unique Shop</Link></li>
          <li>
            {!session ? (
              <button>
                <Link aria-label="sign-in" href={"/auth/login"}>
                  login
                </Link>
              </button>
            ) : (
              <UserButton expires={session?.expires} user={session?.user} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}