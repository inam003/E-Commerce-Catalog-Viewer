"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAccountInfo();
  }, []);

  const getAccountInfo = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const {
        data: [userData],
        error,
      } = await supabase.from("users").select().eq("id", user.id);

      if (error) throw error;
      setEmail(userData.email);
      setPassword(userData.password);
    } catch (error) {
      console.error("Error fetching account-info:", error);
    }
  };

  const updateAccountInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("users")
        .update({
          email: email,
          password: password,
        })
        .eq("id", user.id)
        .select();

      if (error) {
        console.error("Error updating account-info:", error);
        return;
      }

      toast.success("Account updated successfully");
      router.push("/");
    } catch (error) {
      console.log("Error updating invoice:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-10">
      <h1 className="text-3xl font-medium">Settings</h1>
      <div className="space-y-2 px-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2 px-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Link href="/">
          <Button variant="outline" className="bg-white hover:bg-gray-50">
            Cancel
          </Button>
        </Link>
        <Button
          onClick={updateAccountInfo}
          className="bg-blue-500 transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {isLoading ? "Updating" : "Update Profile"}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
