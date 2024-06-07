import { signIn } from "@/auth";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { UserCircleIcon } from "./icons/UserCircleIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuItemContainer } from "./MenuItemContainer";

function SignInDialog() {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuItemContainer>
            <UserCircleIcon />
          </MenuItemContainer>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <DialogTrigger>Sign in</DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="dark:bg-neutral-500/10 backdrop-blur-md max-w-xl border-none py-16">
        <DialogHeader>
          <DialogTitle className="text-center text-4xl dark:text-neutral-100">Sign In</DialogTitle>
        </DialogHeader>
        <div className="mt-6 mb-10 flex flex-col gap-2">
          <SignInForm provider="GitHub" />
          <SignInForm provider="GitHub" />
        </div>
        <div className="flex justify-center">
          <p className="text-center dark:text-neutral-400 text-sm max-w-sm">
            By signing in, you agree to the terms of service and privacy policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SignInForm({ provider }: { provider: string }) {
  const providerLowerCase = provider.toLowerCase();
  return (
    <form
      action={async () => {
        "use server";
        await signIn(providerLowerCase);
      }}
      className="w-full flex justify-center"
    >
      <button className="bg-neutral-800 rounded-md py-3 text-neutral-300 w-full max-w-xs">
        Continue with {provider}
      </button>
    </form>
  );
}

export { SignInDialog };
