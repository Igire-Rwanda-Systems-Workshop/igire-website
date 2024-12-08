"use client";

import React, { useState, useEffect, useMemo } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaPlusCircle, FaFileDownload } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRouter } from "next/navigation";
import DeleteStock from "./DeleteStock";

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const router = useRouter();

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token not found. Please log in.");
        return;
      }

      try {
        // Fetch products
        const productResponse = await fetch(
          "https://iro-website-bn-1.onrender.com/api/Inventory/product/getAll",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const productResult = await productResponse.json();

        // Fetch categories
        const categoryResponse = await fetch(
          "https://iro-website-bn-1.onrender.com/api/Inventory/category/getAll",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const categoryResult = await categoryResponse.json();

        if (productResponse.ok && categoryResponse.ok) {
          setProducts(productResult.data || []);
          setCategories(categoryResult.data || []);
        } else {
          console.error(
            "Error fetching data:",
            productResult.message || categoryResult.message
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Map category IDs to names
  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((category) => {
      map[category._id] = category.categoryName;
    });
    return map;
  }, [categories]);


  const productsWithCategoryName = useMemo(() => {
    return products.map((product) => ({
      ...product,
      categoryName: categoryMap[product.categoryId] || "Unknown",
    }));
  }, [products, categoryMap]);


  const filteredData = useMemo(() => {
    return productsWithCategoryName.filter(
      (item) =>
        item.name.toLowerCase().includes(productSearchTerm.toLowerCase()) &&
        (locationFilter === "" || item.location.includes(locationFilter))
    );
  }, [productSearchTerm, locationFilter, productsWithCategoryName]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableHeaders = [
      "Product ID",
      "Name",
      "Brand",
      "Dimensions",
      "Category Name",
      "Location",
      "Status",
      "Condition",
      "Image",
    ];

    const rows = filteredData.map((item) => [
      item.prod_id || "N/A",
      item.name || "N/A",
      item.brand || "N/A",
      item.dimensions || "N/A",
      item.categoryName || "N/A",
      item.location || "N/A",
      item.status || "N/A",
      item.condition || "N/A",
      item.productImage || "N/A",
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: rows,
    });

    doc.save("Stock.pdf");
  };

  const table = useReactTable({
    data: filteredData,
    columns: [
      {
        accessorKey: "prod_id",
        header: "Product ID",
      },
      {
        accessorKey: "productImage",
        header: "Image",
        cell: ({ row }) => (
          <div>
            <img
              src={row.original.productImage}
              alt={row.original.name}
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "brand",
        header: "Brand",
      },
      {
        accessorKey: "dimensions",
        header: "Dimensions",
      },
      {
        accessorKey: "categoryName",
        header: "Category Name",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "condition",
        header: "Condition",
        cell: ({ row }) => {
          const condition = row.original.condition;
          const getColor = () => {
            if (condition === "new") return "text-green-600";
            if (condition === "used") return "text-yellow-600";
            if (condition === "damaged") return "text-red-600";
            return "text-gray-600";
          };
          return <div className={getColor()}>{condition}</div>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <MdMoreHoriz size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  router.push(`stock/edit/?${row.original.prod_id}`);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRowData(row.original);
                  setOpenDeleteDialog(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full px-6 font-ibm">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-14 md:mt-10 mb-3 space-y-4 sm:space-y-0">
        <p className="py-4 text-xl font-semibold">Stock Overview</p>
        <div className="relative max-w-lg w-full sm:w-auto">
          <HiOutlineSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search product..."
            value={productSearchTerm}
            onChange={(e) => setProductSearchTerm(e.target.value)}
            className="border pl-10 pr-20 rounded-md py-2 w-full"
          />
        </div>
        <div className="flex space-x-2">
          <select
            className="border px-1 text-[15px] py-2 rounded-md"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">Filter Location</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Office">Office</option>
          </select>
          <button
            onClick={handleExportPDF}
            className="flex items-center text-[15px] px-1 py-2 border rounded-md bg-white"
          >
            <FaFileDownload className="mr-1 sm:mr-0" />
            <span className="hidden sm:inline">Download</span>
          </button>
          <a href="stock/addProduct">
            <button className="flex items-center px-1 py-2 text-[15px] border rounded-md bg-black text-white">
              <FaPlusCircle className="mr-1 sm:mr-0" />
              <span className="hidden sm:inline">Add stock</span>
            </button>
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white mt-12">
        <Table className="min-w-[600px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-1 py-1 flex items-center"
        >
          <BiChevronLeft size={20} />
        </Button>
        <span className="mx-2">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-1 py-1 flex items-center"
        >
          <BiChevronRight size={20} />
        </Button>
      </div>

      <DeleteStock
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onDelete={() => {
          // Delete logic goes here
          setOpenDeleteDialog(false);
        }}
      />
    </div>
  );
}