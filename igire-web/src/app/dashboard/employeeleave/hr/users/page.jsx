'use client';

import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineSearch } from "react-icons/hi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const columns = (openDeleteDialog, pageIndex, pageSize) => [
    {
        accessorKey: "number",
        header: "#",
        cell: ({ row }) => (
            <div>
                {pageIndex * pageSize + row.index + 1}
            </div>
        ),
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "telephone", header: "Phone number" },
    { accessorKey: "leaveBalance", header: "Leave Balance" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const statusClass = row.original.status === "Active"
                ? "text-green-600 bg-green-100"
                : "text-red-600 bg-red-100";
            return (
                <div className={`px-2 py-1 rounded-full ${statusClass}`}>
                    {row.original.status}
                </div>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600"
                    onClick={() => console.log("Edit user:", row.original)}
                >
                    <AiFillEdit />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => openDeleteDialog(row.original)}
                >
                    <AiFillDelete />
                </Button>
            </div>
        ),
    },
];

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState("");

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://iro-employee-bn.onrender.com/getAll/employee', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.status}`);
                }
                const data = await response.json();
                let empData =data.employees;
                let ids = empData.map(item => item._id);
                console.log(ids);
                const formattedData = data.employees.map((employee) => ({
                    employeeId: employee.employeeID,
                    firstName: employee.firstName || "",
                    lastName: employee.lastName || "",
                    position: employee.position || "N/A",
                    telephone: employee.telephone || "N/A",
                    leaveBalance: employee.leaveBalance || 0,
                    status: employee.status,
                }));
                setUsers(formattedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const openDeleteDialog = (empData) => {
        setSelectedUser(empData);
    };

    const handleDeleteConfirm = async () => {
        try {
            if (!selectedUser) {
                throw new Error("Invalid User");
            }

            const response = await fetch(`https://iro-employee-bn.onrender.com/employee/${selectedUser.employeeId}`, {
                method: "DELETE",
                headers: {
                    accept: 'application/json',
                },
            });
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", selectedUser);

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to delete user");
            }
            alert("User deleted successfully!");
            fetchUsers();
            setSelectedUser(null); 
        } catch (error) {
            console.error("Error deleting user:", error);
            setError(`Failed to delete user with ID: ${selectedUser?.employeeId || "undefined"}`);
        }
    };

    const filteredUsers = users.filter(user =>
        Object.values(user).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const paginatedUsers = filteredUsers.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    const table = useReactTable({
        data: paginatedUsers,
        columns: columns(openDeleteDialog, pageIndex, pageSize),
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        pageCount: Math.ceil(filteredUsers.length / pageSize),
        onPaginationChange: (paginationState) => {
            setPageIndex(paginationState.pageIndex);
            setPageSize(paginationState.pageSize);
        },
    });

    return (
        <div className="h-screen p-2 sm:p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-xl font-semibold">Manage Users</p>
                <div className="relative sm:w-80 w-full">
                    <Input
                        placeholder="Search user..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPageIndex(0);
                        }}
                        className="pl-10"
                    />
                    <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <a href="/dashboard/employeeleave/hr/users/adduser">
                    <Button className="flex gap-2 text-white">
                        Add User
                        <IoIosAddCircleOutline />
                    </Button>
                </a>
            </div>

            <div className="w-full overflow-y-auto">
                <div className="rounded-md border">
                    {loading ? (
                        <p className="text-center py-4">Loading...</p>
                    ) : error ? (
                        <p className="text-center py-4 text-red-600">Error: {error}</p>
                    ) : (
                        <>
                            <Table>
                                <TableHeader className="bg-[#EFF4FA]">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {paginatedUsers.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length}>
                                                No employees found. Try adjusting your search.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <div className="flex justify-between p-4">
                                <Button
                                    variant="outline"
                                    disabled={pageIndex === 0}
                                    onClick={() => setPageIndex(pageIndex - 1)}
                                >
                                    Previous
                                </Button>
                                <span>
                                    Page {pageIndex + 1} of {Math.ceil(filteredUsers.length / pageSize)}
                                </span>
                                <Button
                                    variant="outline"
                                    disabled={(pageIndex + 1) * pageSize >= filteredUsers.length}
                                    onClick={() => setPageIndex(pageIndex + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete {selectedUser?.firstName} {selectedUser?.lastName}?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedUser(null)}>
                            Cancel
                        </Button>
                        <Button className="bg-red-600 text-white" onClick={handleDeleteConfirm}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageUsers;
