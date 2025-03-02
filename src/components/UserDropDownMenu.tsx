"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { MenuItemContainer } from "./MenuItemContainer";
import { UserCircleIcon } from "./icons/UserCircleIcon";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

function UserDropDownMenu() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.push("/");
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <MenuItemContainer>
          <UserCircleIcon className="w-6 h-6" />
        </MenuItemContainer>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-neutral-900 dark:text-neutral-300 border-none space-y-2">
        <DropdownMenuItem onClick={signOut} className="hover:bg-neutral-800 rounded-md">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserDropDownMenu };
