"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");  // Get token from local storage
  
    console.log("Form Data:", formData);
    console.log("Token:", token);
  
    if (!token) {
      alert("No token found, please log in.");
      return;
    }
  
    try {
      const response = await fetch("https://iro-website-bn-1.onrender.com/api/Inventory/users/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
        },
        body: JSON.stringify({
          name: formData.name,
          userId: formData.userId,
          email: formData.email,
          role: formData.role,
        }),
      });
  
      console.log("Response Status:", response.status);
  
      
      if (!response.ok) {
        throw new Error(`Failed to create user. Status: ${response.status}`);
      }
  
      const data = await response.json();  
      alert("User added successfully!");
      console.log("Response Data:", data);  
  
    } catch (error) {
      console.error("Error in fetch:", error);
      alert(`Failed to add user: ${error.message}`);
    }
  };
  
  return (
    <div className="flex justify-center mt-4 font-ibm">
      <Card className="w-full max-w-2xl border p-3">
        <CardHeader>
          <CardTitle className="text-xl">Add User</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-3">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* User ID */}
            <div className="space-y-1">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                name="userId"
                type="text"
                placeholder="Enter user ID"
                value={formData.userId}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            <div className="space-y-1">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                type="text"
                placeholder="Enter role (e.g.,admin, Operations Manager)"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full flex items-center justify-center bg-black text-white"
            >
              Save User
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}