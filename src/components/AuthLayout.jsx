import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

function AuthLayout({ children }) {
  return (
    <div className="
      relative min-h-screen flex items-center justify-center overflow-hidden
      bg-white dark:bg-black
      transition-colors duration-500
    ">

      {/* 🌞 LIGHT MODE BACKGROUND */}
      <div className="
        absolute inset-0
        bg-gradient-to-br
        from-white via-slate-100 to-white
        dark:hidden
      " />

      {/* 🌙 DARK MODE BACKGROUND */}
      <div className="
        absolute inset-0 hidden dark:block
        bg-gradient-to-br from-black via-slate-900 to-black
      " />

      {/* ✨ GLOW ONLY IN DARK MODE */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="
          hidden dark:block
          absolute inset-0 opacity-40 blur-3xl
          bg-[radial-gradient(circle_at_20%_30%,#3b82f6,transparent_40%),radial-gradient(circle_at_80%_70%,#8b5cf6,transparent_40%)]
        "
      />

      {/* 🌗 Toggle */}
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggle />
      </div>

      {/* 🎯 Content */}
      <div className="relative w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;