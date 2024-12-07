'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const AddUserPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        position: "",
        gender: "",
        telephone: "",
        supervisorId: "",
        password: "",
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleAddUser = async () => {
        const payload = {
            supervisorId: formData.supervisorId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            position: formData.position,
            gender: formData.gender,
            telephone: formData.telephone,
            password: "password", // Example password
        };

        try {
            const response = await fetch("https://iro-employee-bn.onrender.com/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("User added successfully!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    position: "",
                    gender: "",
                    telephone: "",
                    supervisorId: "",
                    password: "",
                });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "Failed to add user"}`);
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="flex py-6">
            <div className="mx-2 md:mx-6 w-full">
                <h1 className="text-xl font-bold mb-6">Add New Employee</h1>

                <div className="flex gap-5 bg-white p-6 rounded-xl shadow-md">
                    <div className="space-y-4 w-full">
                        <div className="flex flex-col">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                placeholder="Enter first name"
                                value={formData.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                placeholder="Enter last name"
                                value={formData.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col">
                            <Label htmlFor="telephone">Telephone</Label>
                            <Input
                                id="telephone"
                                placeholder="Enter telephone"
                                value={formData.telephone}
                                onChange={(e) => handleChange("telephone", e.target.value)}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 w-full">
                        <div className="flex flex-col">
                            <Label htmlFor="gender" className="mb-2">Gender</Label>
                            <Select
                                id="gender"
                                value={formData.gender}
                                onValueChange={(value) => handleChange("gender", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="others">Others</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col">
                            <Label htmlFor="position" className="mb-2">Position</Label>
                            <Select
                                id="position"
                                value={formData.position}
                                onValueChange={(value) => handleChange("position", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Operation Manager">Operation Manager</SelectItem>
                                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                                    <SelectItem value="Program Manager">Program Manager</SelectItem>
                                    <SelectItem value="Finance Manger">Finance Manger</SelectItem>
                                    <SelectItem value="CEO">CEO</SelectItem>
                                    <SelectItem value="Interns">Interns</SelectItem>
                                    <SelectItem value="Tutor">Tutor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        onClick={handleAddUser}
                        disabled={
                            !formData.firstName ||
                            !formData.lastName ||
                            !formData.email ||
                            !formData.position ||
                            !formData.gender
                        }
                        className="bg-[#0FA958] text-white px-8 py-2 disabled:bg-gray-400"
                    >
                        Add User
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddUserPage;
