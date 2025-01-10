import { ChartBarIcon } from "@/components/icons/ChartBarIcon";
import { QueueListIcon } from "@/components/icons/QueueListIcon";
import Link from "next/link";
import { SignInDialog } from "./SignInDialog";
import { auth } from "@/auth";
import { MenuItemContainer } from "./MenuItemContainer";
import { UserDropDownMenu } from "./UserDropDownMenu";
import { SunIcon } from "lucide-react";
import { HomeIcon } from "./icons/HomeIcon";

export async function Menu() {
  const session = await auth();

  return (
    <div className="flex flex-col h-screen justify-between border-r border-neutral-900 px-2 py-7 sticky top-0">
      <div className="flex flex-col space-y-3">
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
        <Link href={"data-insights"}>
          <MenuItemContainer>
            <ChartBarIcon />
          </MenuItemContainer>
        </Link>
      </div>
      <div className="flex justify-center">{session ? <UserDropDownMenu /> : <SignInDialog />}</div>
    </div>
  );
}
