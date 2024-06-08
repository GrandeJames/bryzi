import { auth, signOut } from "@/auth";
import { MenuItemContainer } from "./MenuItemContainer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { Cog6ToothIcon } from "./icons/Cog6ToothIcon";

async function UserDropDownMenu() {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative size-[40px] rounded-full overflow-hidden">
          {session?.user?.image ? (
            <Image src={session.user.image ?? ""} alt="" fill={true}></Image>
          ) : (
            <Cog6ToothIcon />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="w-full"
          >
            <button type="submit" className="w-full text-left p-2">Sign out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserDropDownMenu };
