import { removeToken } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  return (
    <PageWrapper>
    <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="min-h-screen flex items-center justify-center bg-black text-white flex-col gap-4"
>
    <div className="min-h-screen flex items-center justify-center bg-black text-white flex-col gap-4">
      <h1 className="text-3xl">Welcome to OmniVerse 🚀</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 rounded-lg"
      >
        Logout
      </button>
    </div>
    </motion.div>
    </PageWrapper>
  );
}

export default Dashboard;