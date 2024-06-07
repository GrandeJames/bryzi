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

async function UserDropDownMenu() {
  const session = await auth();

  console.log("session", session);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuItemContainer>
          <Image src={session?.user?.image ?? ""} alt="" fill={true}></Image>
        </MenuItemContainer>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserDropDownMenu };
