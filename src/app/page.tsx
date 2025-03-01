import Icon2 from "@/components/icons/Icon2";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { CalendarIcon, ClockIcon, ChartBarIcon, SparklesIcon, FlameIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 relative overflow-x-hidden">
      <nav className="fixed w-full bg-neutral-900/80 backdrop-blur-md z-50 border-b border-neutral-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Icon2 />
            <span className="text-2xl font-bold text-orange-400">Bryzi</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a
              href="#features"
              className="text-neutral-300 hover:text-orange-500 transition-colors"
            >
              Features
            </a>
            <a
              href="/login"
              className="text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Log In
            </a>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <header className="container mx-auto px-6 pt-32 pb-20 text-center relative">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-medium">
              Beta
            </span>
          </div>

          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Academic Mastery,{" "}
            <span className="bg-gradient-to-r from-orange-200 to-orange-400 bg-clip-text text-transparent">
              Automated
            </span>
          </h1>

          <p className="text-xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The task management system <span className="italic">built for students</span> — generate
            tasks from your course schedules, automatically plan your days, and track your progress.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={"/login"}>
              <button className="bg-orange-400 hover:bg-orange-400/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl shadow-neutral-900">
                Get started
              </button>
            </Link>
          </div>
        </div>

        {/* App Preview with Glow Effect */}
        <div className="mt-20 mx-auto max-w-5xl relative">
          <div className="absolute inset-0 bg-orange-500/10 blur-3xl -z-10"></div>
          <div className="border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden bg-neutral-900/50 backdrop-blur-xl">
            <Image
              src="/landing-page.png"
              alt="App interface"
              className="w-full"
              width={1280}
              height={720}
            />
          </div>
        </div>
      </header>

      <section>{/* <TaskPlannerDemo /> */}</section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-neutral-900/50">
        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: MagicWandIcon,
              title: "AI Task Generation",
              text: "Automatically plan your whole semester in seconds",
            },
            {
              icon: CalendarIcon,
              title: "Auto-Schedule",
              text: "Automated and intelligent task planning, taking into account your schedule, so you can focus on what's important",
            },
            // {
            //   icon: BrainIcon,
            //   title: "Eliminate Decision Fatigue",
            //   text: "Automatic task scheduling and prioritization",
            // },
            {
              icon: ClockIcon,
              title: "Integrated Focus Sessions",
              text: "Focus timer to notify you when it's time to take a break, crucial for maintaining productivity",
            },
            {
              icon: ChartBarIcon,
              title: "Progress Tracking",
              text: "Assess your work habits to optimize productivity",
            },
            { icon: SparklesIcon, title: "AI Assistant", text: "Predictive task creation" },
            {
              icon: FlameIcon,
              title: "Enhanced Motivation",
              text: "Use AI to break down large tasks",
            },
            // {
            //   icon: SparklesIcon,
            //   title: "Higher Grades",
            //   text: "Spaced repetition task scheduling",
            // },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-neutral-800/50 rounded-xl border border-neutral-800 hover:border-orange-500/30 transition-all"
            >
              <div className="bg-orange-500/10 w-14 h-14 rounded-xl mb-6 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-neutral-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      {/* <section id="timeline" className="py-20 bg-neutral-900">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold text-white mb-6">Dynamic Academic Timeline</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Course Integration</h3>
                  <p className="text-neutral-400">
                    Automatically syncs with your university schedule
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-neutral-800 p-6 rounded-2xl shadow-xl">
            <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-orange-500/30 scrollbar-track-neutral-900"></div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">No more planning</h2>
          <p className="text-neutral-100 mb-8 max-w-xl mx-auto text-lg">
            Get ahead with AI-powered academic planning!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={"/login"}>
              <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-neutral-50 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Bryzi</h3>
              <p className="text-neutral-400 text-sm">
                Empowering students through automated organization
              </p>
            </div>
            {/* Add footer columns */}
          </div>
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
            {/* <p className="text-neutral-500 text-sm">&copy; 2024 OnlyAs. All rights reserved.</p> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
