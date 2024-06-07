import { ChartBarIcon } from "@/components/icons/ChartBarIcon";
import { Cog6ToothIcon } from "@/components/icons/Cog6ToothIcon";
import { GiftIcon } from "@/components/icons/GiftIcon";
import { QueueListIcon } from "@/components/icons/QueueListIcon";
import Link from "next/link";
import { HomeIcon } from "./icons/HomeIcon";
import { SignInDialog } from "./SignInDialog";
import { auth } from "@/auth";
import { MenuItemContainer } from "./MenuItemContainer";
import { UserDropDownMenu } from "./UserDropDownMenu";

export async function Menu() {
  const session = await auth();

  console.log("session", session);
  return (
    <div className="flex flex-col space-y-3 w-min border-r h-screen border-neutral-800 px-2 py-10">
      <Link href={"/"}>
        <MenuItemContainer>
          <HomeIcon />
        </MenuItemContainer>
      </Link>
      <Link href={"tasks"}>
        <MenuItemContainer>
          <QueueListIcon />
        </MenuItemContainer>
      </Link>
      <Link href={"rewards"}>
        <MenuItemContainer>
          <GiftIcon />
        </MenuItemContainer>
      </Link>
      <Link href={"data-insights"}>
        <MenuItemContainer>
          <ChartBarIcon />
        </MenuItemContainer>
      </Link>
      <Link href={"settings"}>
        <MenuItemContainer>
          <Cog6ToothIcon />
        </MenuItemContainer>
      </Link>
      {session ? <UserDropDownMenu /> : <SignInDialog />}
    </div>
  );
}
