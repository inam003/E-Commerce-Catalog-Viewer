"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignUpForm({ className, ...props }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
      });

      const { error } = await supabase
        .from("users")
        .insert({ email: email, password: password });
      if (error) throw error;

      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create account</CardTitle>
          <CardDescription>
            Enter your credentials to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <Button
                  onClick={handleSignUp}
                  disabled={isLoading}
                  type="submit"
                  className="w-full"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}