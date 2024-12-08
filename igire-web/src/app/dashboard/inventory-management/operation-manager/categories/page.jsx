"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoWarning } from "react-icons/io5";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import CreateCategory from "./CreateCategory";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = "https://iro-website-bn-1.onrender.com";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [removeCategoryId, setRemoveCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized. Please log in.");
        }
  
        const response = await fetch(`${API_BASE_URL}/api/Inventory/category/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setCategories(data);
          console.log("Fetched categories:", data); 
        } else {
          throw new Error("Unexpected data format from API.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err.message); 
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);
  

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const updateCategory = async () => {
    if (editCategory && editCategory.categoryName.trim()) {
      console.log("iiiiiiiiiiiiiii",editCategory._id)
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized. Please log in.");
        }
        
        const response = await fetch(
          `${API_BASE_URL}/api/Inventory/category/update/${editCategory._id}`,
          {
            method: "PUT",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ categoryName: editCategory.categoryName }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update category.");
        }

        const updatedCategory = await response.json();
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === editCategory._id ? updatedCategory : category
          )
        );
        setEditCategory(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeCategory = async () => {
    if (removeCategoryId) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized. Please log in.");
        }

        const response = await fetch(
          `${API_BASE_URL}/api/Inventory/category/delete/${removeCategoryId}`,
          { 
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete category.");
        }

        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== removeCategoryId)
        );
        setRemoveCategoryId(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-5xl mt-6 mx-auto p-8">
      <div className="flex justify-between items-center mt-5 md:mt-0 mb-10">
        <h1 className="text-xl font-semibold text-black">Categories</h1>
        <CreateCategory addCategory={addCategory} />
      </div>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{category._id}</td>
              <td className="border border-gray-300 px-4 py-2">{category.categoryName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => setEditCategory(category)}
                      className="bg-gray-300 text-black mx-1"
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Label htmlFor="editCategoryName">Category Name</Label>
                      <Input
                        id="editCategoryName"
                        placeholder="Enter new category name"
                        value={editCategory?.categoryName || ""}
                        onChange={(e) =>
                          setEditCategory({ ...editCategory, categoryName: e.target.value })
                        }
                      />
                      <Button onClick={updateCategory} className="w-full bg-black text-white">
                        Update Category
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => setRemoveCategoryId(category._id)}
                      className="bg-red-500 text-white mx-1"
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Category</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>Are you sure you want to remove this category?</p>
                      <div className="flex items-center text-red-500">
                        <IoWarning className="mr-2" size={24} />
                        <p className="text-sm">This action cannot be undone!</p>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={removeCategory}
                          className="bg-red-500 text-white px-4 py-2"
                        >
                          Yes, remove
                        </Button>
                        <Button
                          onClick={() => setRemoveCategoryId(null)}
                          className="bg-gray-300 px-4 py-2"
                        >
                          Cancel
                        </Button>
                      </DialogFooter>
                    </div>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;