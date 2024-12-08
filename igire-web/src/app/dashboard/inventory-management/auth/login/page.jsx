"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import React, { useState } from "react";
import axios from "axios";
import  { jwtDecode } from "jwt-decode";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setError("Both email and password are required.");
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!validateForm()) return;
    setIsSubmit(true);

    try {
      console.log("Trying to login with:", { email, password });

      const response = await axios.post(
        "https://iro-website-bn-1.onrender.com/api/Inventory/users/login",
        { email, password }
      );
      console.log("API Response Data:", response.data);
      
      const token = response.data.token; 
      
      if (!token) {
        setError("No authentication token received.");
        return;
      }

      // Decode the token
      let decodedToken;
      try {
        decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
      } catch (decodeError) {
        console.error("Token decoding error:", decodeError);
        setError("Invalid authentication token.");
        return;
      }

      // Use the role from the decoded token, with a fallback
      const position = decodedToken.role || "unknown";
      console.log("User Role:", position);

      // Store token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("position", position);

      // Routing logic based on decoded role
      let redirectPath = "/";
      switch (position.toLowerCase()) {
        case "hr":
          redirectPath = "/dashboard/employeeleave/hr";
          break;
        case "employee":
          redirectPath = "/dashboard/employeeleave/employee";
          break;
        case "admin":
          redirectPath = "/dashboard/inventory-management/admin";
          break;
        case "operations manager":
          redirectPath = "/dashboard/inventory-management/operation-manager";
          break;
        default:
          console.warn("Unexpected position:", position);
      }

      console.log("Redirecting to:", redirectPath);
      router.push(redirectPath);
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response) {
        setError(err.response.data.message || "Login failed. Please try again.");
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center px-4"
      style={{
        backgroundImage: "url('/scc15C.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(0.7)",
      }}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmit}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmit}
              />
              <Link href="/resetPass" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmit}>
              {isSubmit ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogIn;