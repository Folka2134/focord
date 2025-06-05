import { SignInButton } from "@clerk/clerk-react";

export const SignIn = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Welcome to Focord</h1>
      <SignInButton />
    </div>
  );
};
