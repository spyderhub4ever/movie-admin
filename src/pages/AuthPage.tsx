import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { usePost } from "@/hooks/api/useApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthPage() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { execute: login, loading: loginLoading } = usePost("/auth/login", {
    onSuccess: (data: {
      access_token: string;
      user: { id: string; name: string; email: string; image?: string };
    }) => {
      localStorage.setItem("auth_token", data.access_token);
      setAccessToken(data.access_token);
      setUser(data.user);
      navigate("/");
    },
  });

  const { execute: register, loading: registerLoading } = usePost(
    "/auth/register",
    {
      onSuccess: (data: { token: string }) => {
        localStorage.setItem("auth_token", data.token);
      },
    }
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 relative overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="relative z-10 text-center">
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-6 shadow-2xl">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-600/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-600/20 rounded-full blur-xl"></div>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Welcome to the
            <span className="block bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Future
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Join thousands of users who trust us with their digital experience.
            Your journey starts here.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Get Started
                </h2>
                <p className="text-gray-400">Create your account or sign in</p>
              </div>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 mb-8 bg-gray-800 rounded-xl p-1.5 w-full h-12">
                  <TabsTrigger
                    value="login"
                    className="cursor-pointer flex items-center gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 rounded-lg transition-all duration-300"
                  >
                    <LogIn size={16} /> Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="cursor-pointer flex items-center gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 rounded-lg transition-all duration-300"
                  >
                    <UserPlus size={16} /> Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-6">
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label
                        htmlFor="login-email"
                        className="text-gray-300 font-medium"
                      >
                        Email Address
                      </Label>
                      <div className="relative mt-2">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              email: e.target.value,
                            })
                          }
                          className="pl-12 bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-500 rounded-xl h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="login-password"
                        className="text-gray-300 font-medium"
                      >
                        Password
                      </Label>
                      <div className="relative mt-2">
                        <Lock
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              password: e.target.value,
                            })
                          }
                          placeholder="Enter your password"
                          className="pl-12 pr-12 bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-500 rounded-xl h-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      onClick={() => login({ data: loginForm })}
                      className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl h-12 shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      disabled={loginLoading}
                    >
                      {loginLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Signing in...
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    <div className="text-center">
                      <button className="text-gray-400 hover:text-white text-sm transition-colors">
                        Forgot your password?
                      </button>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="register" className="space-y-6">
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <Label
                      htmlFor="register-name"
                      className="text-gray-300 font-medium"
                    >
                      Full Name
                    </Label>
                    <div className="relative mt-2">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Enter your full name"
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            name: e.target.value,
                          })
                        }
                        className="pl-12 bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-500 rounded-xl h-12"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="register-email"
                        className="text-gray-300 font-medium"
                      >
                        Email Address
                      </Label>
                      <div className="relative mt-2">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="you@example.com"
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              email: e.target.value,
                            })
                          }
                          className="pl-12 bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-500 rounded-xl h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="register-password"
                        className="text-gray-300 font-medium"
                      >
                        Password
                      </Label>
                      <div className="relative mt-2">
                        <Lock
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              password: e.target.value,
                            })
                          }
                          placeholder="Create a strong password"
                          className="pl-12 pr-12 bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-500 rounded-xl h-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      onClick={() => register({ data: registerForm })}
                      className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl h-12 shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      disabled={registerLoading}
                    >
                      {registerLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating account...
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">
                        By signing up, you agree to our{" "}
                        <button className="text-indigo-400 hover:text-indigo-300 transition-colors underline">
                          Terms of Service
                        </button>
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
