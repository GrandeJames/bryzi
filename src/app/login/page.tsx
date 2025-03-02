"use client";

import Icon2 from "@/components/icons/Icon2";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const signInWithGoogle = async () => {
    // TODO: use env variable for redirectUrl but this is fine for now
    const redirectUrl =
      process.env.NODE_ENV === "production"
        ? "https://bryzi.com/app/today"
        : "http://localhost:3000/app/today";

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });

    console.log("data", data);

    if (error) {
      console.error("Error signing in:", error.message);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/app/today");
      }
    };

    checkAuth();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex">
      <LeftSection />
      <RightSection signInWithGoogle={signInWithGoogle} />
    </div>
  );
}

function LeftSection() {
  return (
    <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-400/90 to-amber-500/90 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay"></div>

      <div className="relative z-10 p-12 flex flex-col justify-between text-white">
        <div className="space-y-2">
          <Icon2 className="dark:text-white text-white" />
          <h2 className="text-3xl font-bold mt-8">Elevate your Productivity</h2>
          <p className="text-white/80">Transform your workflow with intelligent task management</p>
        </div>

        <Visual />
      </div>
    </div>
  );
}

function RightSection({ signInWithGoogle }: { signInWithGoogle: () => void }) {
  return (
    <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Get Started</h1>
          <p className="text-gray-500">Sign in to continue to your workspace</p>
        </div>

        <div className="space-y-6">
          <button
            onClick={signInWithGoogle}
            disabled={false}
            className="w-full flex items-center justify-center gap-3 h-12 px-6 transition-all 
                  rounded-lg border border-gray-200 hover:border-gray-300 bg-white 
                  text-gray-700 hover:text-gray-900 font-medium disabled:opacity-50
                  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {false ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <GoogleIcon />
                Continue with Google
              </>
            )}
          </button>

          {/* {error && (
        <div className="text-red-600 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-100">
          {error}
        </div>
      )} */}

          {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div> */}
        </div>

        <p className="text-center text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-orange-400 hover:text-indigo-700 font-medium">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-orange-400 hover:text-indigo-700 font-medium">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function Visual() {
  return (
    <div className="h-fit w-full bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 relative">
          <div className="h-10 bg-white/10 rounded-2xl animate-pulse" style={{ width: "100%" }} />
          <div className="w-4 h-4 rounded-md border-2 border-white/20 absolute right-5" />
        </div>

        <div className="flex items-center justify-between gap-3 relative">
          <div className="h-10 bg-white/10 rounded-2xl animate-pulse" style={{ width: "100%" }} />
          <div className="w-4 h-4 rounded-md border-2 border-white/20 absolute right-5" />
        </div>

        <div className="flex items-center justify-between gap-3 relative">
          <div className="h-10 bg-white/10 rounded-2xl animate-pulse" style={{ width: "100%" }} />
          <div className="w-4 h-4 rounded-md border-2 border-white/20 absolute right-5" />
        </div>

        <div className="flex items-center justify-between gap-3 opacity-50 relative">
          <div className="h-10 bg-white/10 rounded-2xl animate-pulse" style={{ width: "100%" }} />
          <div className="w-4 h-4 rounded-sm border-2 border-white/20 absolute right-5" />
        </div>

        <div className="flex items-center justify-between gap-3 opacity-30 relative">
          <div className="h-10 bg-white/10 rounded-2xl animate-pulse" style={{ width: "100%" }} />
          <div className="w-4 h-4 rounded-sm border-2 border-white/20 absolute right-5" />
        </div>
      </div>
    </div>
  );
}
