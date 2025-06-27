import { useAuthStore } from "@/store/useAuthStore";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const Authenticate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupFormData, setSignupFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const isSigningUp = useAuthStore((state) => state.isSigningUp);
  const signup = useAuthStore((state) => state.signup);
  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);
  const login = useAuthStore((state) => state.login);

  // TODO: Refactor form valudations
  const validateSignupForm = () => {
    if (!signupFormData.fullName.trim())
      return toast.error("Full name is required");
    if (!signupFormData.userName.trim())
      return toast.error("User name is required");
    if (!signupFormData.email.trim()) return toast.error("Email is required");
    if (!signupFormData.password.trim())
      return toast.error("Password is required");
    return true;
  };

  const validateLoginForm = () => {
    if (!loginFormData.email.trim()) return toast.error("Email is required");
    if (!loginFormData.password.trim())
      return toast.error("Password is required");
    return true;
  };

  // TODO: Refactor handle submits
  const handleSignup = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const success = validateSignupForm();
    if (success) {
      signup(signupFormData);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("Login button");
    const success = validateLoginForm();
    if (success) {
      login(loginFormData);
    }
  };

  return (
    <div className="mt-20 flex w-full flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold">Welcome to Focord</h1>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="login">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                  <Input
                    type="text"
                    placeholder="Email"
                    value={loginFormData.email}
                    onChange={(e) =>
                      setLoginFormData({
                        ...loginFormData,
                        email: e.target.value,
                      })
                    }
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginFormData.password}
                      onChange={(e) =>
                        setLoginFormData({
                          ...loginFormData,
                          password: e.target.value,
                        })
                      }
                    />
                    <Button
                      variant={"outline"}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="size-5" />
                      ) : (
                        <EyeOff className="size-5" />
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  variant={"outline"}
                  disabled={isLoggingIn}
                  type="submit"
                  className="cursor-pointer"
                  onClick={handleLogin}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="size-5 animate-spin" /> Loading...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={signupFormData.fullName}
                    onChange={(e) =>
                      setSignupFormData({
                        ...signupFormData,
                        fullName: e.target.value,
                      })
                    }
                  />
                  <Input
                    type="text"
                    placeholder="User Name"
                    value={signupFormData.userName}
                    onChange={(e) =>
                      setSignupFormData({
                        ...signupFormData,
                        userName: e.target.value,
                      })
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    value={signupFormData.email}
                    onChange={(e) =>
                      setSignupFormData({
                        ...signupFormData,
                        email: e.target.value,
                      })
                    }
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={signupFormData.password}
                      onChange={(e) =>
                        setSignupFormData({
                          ...signupFormData,
                          password: e.target.value,
                        })
                      }
                    />
                    <Button
                      variant={"outline"}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="size-5" />
                      ) : (
                        <EyeOff className="size-5" />
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  variant={"outline"}
                  disabled={isSigningUp}
                  type="submit"
                  onClick={handleSignup}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>{" "}
    </div>
  );
};
