'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ManageLeaveTypes = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [leaveType, setLeaveType] = useState([]);
    // const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchLeaveTypes = async () => {
            try {
                const response = await fetch("https://iro-employee-bn.onrender.com/getAll/leave");
                const data = await response.json();

                console.log("leave type data:", data);
                setLeaveType(data.leaveTypes);
            } catch (error) {
                console.error("Error fetching leave types:", error);
                setLeaveType([]);
            }
        };

        fetchLeaveTypes();
    }, []);

    const filteredData = Array.isArray(leaveType)
        ? leaveType.filter((type) =>
            type.leaveType?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Manage Leave Types</h1>
                <Input
                    placeholder="Search records"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                />
                <a href="/dashboard/employeeleave/hr/leavetypes/addnewleave">
                    <Button className="flex gap-2 text-white">
                        Add new leave
                        <IoIosAddCircleOutline />
                    </Button>
                </a>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Leave Type</TableCell>
                        <TableCell>Given Days</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.length > 0 ? (
                        filteredData.map((type) => (
                            <TableRow key={type._id}>
                                <TableCell>{type.leaveType}</TableCell>
                                <TableCell>{type.daysAllowed}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="2" className="text-center">
                                No data available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ManageLeaveTypes;
