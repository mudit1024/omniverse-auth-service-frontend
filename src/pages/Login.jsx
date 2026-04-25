import { useEffect, useState } from "react";
import { getQueryParams } from "../utils/queryParser";
import { appConfig } from "../config/appConfig";
import { loginUser } from "../services/authService";
import { setToken } from "@/utils/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import { isAuthenticated  } from "@/utils/auth";


import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [appInfo, setAppInfo] = useState({
        app: null,
        redirect: null,
    });

    useEffect(() => {
        const params = getQueryParams();
        setAppInfo(params);
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/dashboard");
        }
    }, []);

    const appData = appInfo.app ? appConfig[appInfo.app] : null;

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("All fields are required ⚠️");
            return;
        }

        if (!email.includes("@")) {
            toast.error("Enter a valid email ❌");
            return;
        }

        setLoading(true);

        try {
            const data = await loginUser(email, password);
            setToken(data.token);

            toast.success("Login successful 🚀");
            localStorage.setItem("email", email);

            if (appInfo.redirect) {
                window.location.href = `${appInfo.redirect}?token=${data.token}`;
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            toast.error(err?.response?.data?.message || "Login failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <AuthLayout>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative"
                >

                    {/* Glow Layer */}
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-40 blur-2xl"></div>

                    <Card className="
  relative
  p-8
  rounded-3xl
  transition-all duration-500

  hover:shadow-2xl
  hover:-translate-y-1

  bg-white
  shadow-xl shadow-gray-200
  border border-gray-200

  dark:bg-white/5
  dark:backdrop-blur-2xl
  dark:border-white/10
  dark:shadow-[0_20px_80px_rgba(0,0,0,0.7)]
">

                        {/* HEADER */}
                        <div className="text-center mb-8">

                            <h2 className="
  text-3xl font-bold text-center mb-4

  text-gray-900
  dark:text-transparent
  dark:bg-gradient-to-r dark:from-blue-300 dark:via-purple-300 dark:to-indigo-400
  dark:bg-clip-text
">
                                {appData ? appData.name : "OmniVerse"}
                            </h2>

                            <p className="
  text-sm text-gray-600
  dark:text-gray-300
  text-center mb-6
">
                                Login to continue
                            </p>

                            {appData && (
                                <p className="text-xs text-gray-400 mt-1">
                                    Requested by{" "}
                                    <span className="text-purple-300 font-medium">
                                        {appData.name}
                                    </span>
                                </p>
                            )}
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleLogin} className="space-y-6">

                            <div className="space-y-2">
                                <label className="
  text-sm font-medium
  text-gray-700
  dark:text-gray-200
">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="
  bg-white border border-gray-300
  text-gray-900 placeholder:text-gray-400

  transition-all duration-300 ease-out

  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/30
  focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]

  hover:border-gray-400

  dark:bg-white/5
  dark:border-white/10
  dark:text-white
  dark:placeholder:text-gray-400
  dark:hover:border-white/20
  dark:focus:border-blue-400
  dark:focus:ring-blue-400/40
  dark:focus:shadow-[0_0_0_4px_rgba(59,130,246,0.2)]
"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="
  text-sm font-medium
  text-gray-700
  dark:text-gray-200
">
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="
  bg-white border border-gray-300
  text-gray-900 placeholder:text-gray-400

  transition-all duration-300 ease-out

  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/30
  focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]

  hover:border-gray-400

  dark:bg-white/5
  dark:border-white/10
  dark:text-white
  dark:placeholder:text-gray-400
  dark:hover:border-white/20
  dark:focus:border-blue-400
  dark:focus:ring-blue-400/40
  dark:focus:shadow-[0_0_0_4px_rgba(59,130,246,0.2)]
"
                                />
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Button
                                    className="
      w-full font-semibold

      bg-blue-600 text-white
      hover:bg-blue-700

      dark:bg-gradient-to-r dark:from-blue-500 dark:via-purple-500 dark:to-indigo-500
      dark:hover:from-blue-600 dark:hover:via-purple-600 dark:hover:to-indigo-600

      shadow-md hover:shadow-lg
      transition-all duration-300
    "
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Logging in...
                                        </div>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </motion.div>
                        </form>

                    </Card>
                </motion.div>
            </AuthLayout>
        </PageWrapper>
    );
}

export default Login;