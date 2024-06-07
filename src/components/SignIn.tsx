import { signIn } from "@/auth.ts"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";



function SignIn() {
  return (
    <Dialog>
      <DialogTrigger>Sign In</DialogTrigger>
      <DialogContent className="dark:bg-neutral-500/10 backdrop-blur-md max-w-2xl border-none py-20">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl dark:text-orange-500">Sign In</DialogTitle>
          <DialogDescription className="text-center dark:text-neutral-400">
            Sign in to save your data and access all features
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-10 mb-20">
          <div className="space-y-3">
            <SignInOrgButton org="github" />
          </div>
        </div>
        <div className="flex justify-center">
          <p className=" text-center dark:text-neutral-400 text-sm max-w-sm">
            By signing in, you agree to the terms of service and privacy policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SignInOrgButton({ org }: { org: string }) {
    return <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button className="bg-neutral-800 rounded-md py-3 text-neutral-300">Sign in with {org}</button>
    </form>
}

export { SignIn };
