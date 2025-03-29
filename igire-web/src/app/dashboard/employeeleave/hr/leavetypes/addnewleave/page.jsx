'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AddLeaveType = () => {
    const [formData, setFormData] = useState({
        leaveType: "",
        description: "",
        daysAllowed: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleAddLeave = async () => {
        setLoading(true);
        setMessage("");
        try {
            const response = await fetch("http://iro-employee-bn.onrender.com/addLeaveType", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    leaveType: formData.leaveType,
                    description: formData.description,
                    daysAllowed: parseInt(formData.daysAllowed, 10), // Ensure it's a number
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add leave type.");
            }

            setMessage("Leave type added successfully!");
            setFormData({ leaveType: "", description: "", daysAllowed: "" }); // Reset form
        } catch (error) {
            setMessage(error.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex py-6">
            <div className="mx-2 md:mx-6 w-full">
                <h1 className="text-xl font-bold mb-6">Add Leave Type</h1>

                <div className="flex gap-5 bg-white p-6 rounded-xl shadow-md">
                    <div className="space-y-4 w-full">
                        {/* Leave Type */}
                        <div className="flex flex-col">
                            <Label htmlFor="leaveType">Leave Type</Label>
                            <Input
                                id="leaveType"
                                placeholder="Enter leave type"
                                value={formData.leaveType}
                                onChange={(e) => handleChange("leaveType", e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                placeholder="Enter leave description"
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        {/* Days Allowed */}
                        <div className="flex flex-col">
                            <Label htmlFor="daysAllowed">Days Allowed</Label>
                            <Input
                                id="daysAllowed"
                                placeholder="Enter number of days allowed"
                                value={formData.daysAllowed}
                                onChange={(e) => handleChange("daysAllowed", e.target.value)}
                                className="mt-2"
                                type="number"
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Add Button */}
                <div className="mt-6">
                    <Button
                        onClick={handleAddLeave}
                        disabled={
                            !formData.leaveType ||
                            !formData.description ||
                            !formData.daysAllowed ||
                            loading
                        }
                        className={`bg-[#0FA958] text-white px-8 py-2 disabled:bg-gray-400 ${loading ? "opacity-75" : ""}`}
                    >
                        {loading ? "Adding..." : "Add Leave"}
                    </Button>
                </div>

                {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
            </div>
        </div>
    );
};

export default AddLeaveType;
