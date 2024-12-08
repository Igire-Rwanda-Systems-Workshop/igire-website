"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CreateCategory from "../../categories/CreateCategory";
const AddProductForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    brand: "",
    dimensions: "",
    location: "",
    status: "",
    condition: "",
    dateOfEntry: "",
    image: null,
    borrowedBy: {
      borrowerName: "",
      nationalId: "",
      productId: "",
      borrowingDate: "",
      returningDate: "",
    },
  });



  const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
  const [categories, setCategories] = useState(["electronics", "furniture", "stationery"]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name in formData.borrowedBy) {
      setFormData({
        ...formData,
        borrowedBy: { ...formData.borrowedBy, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const addCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, newCategory.name]);
      setNewCategory({ name: "", icon: "" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">Add New Product</h1>
        <CreateCategory addCategory={addCategory} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border rounded-md p-12">
        {/* Product Information Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category">Product Category</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  {formData.category || "Select category"}
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                type="text"
                placeholder="Enter brand name"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                name="dimensions"
                type="text"
                placeholder="Enter dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dateOfEntry">Date of Entry</Label>
              <Input
                id="dateOfEntry"
                name="dateOfEntry"
                type="date"
                value={formData.dateOfEntry}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-8 justify-between flex ">
          <Button className="bg-black text-white p-4">Update </Button>
        
        </div>
        </section>

        <Separator />

        {/* Status and Condition Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Status and Condition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  {formData.status || "Select status"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="borrowed">Borrowed</SelectItem>
                  <SelectItem value="stolen">Stolen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, condition: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  {formData.condition || "Select condition"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>

           
          </div>
          <div className="mt-8 justify-between flex ">
          <Button className="bg-black text-white p-4">Update status</Button>
          <Button className="bg-black text-white p-4">Update condition</Button>
        </div>
        </section>

        <Separator />

        {/* Borrower Details Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Borrower Details (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="borrowerName">Borrower Name</Label>
              <Input
                id="borrowerName"
                name="borrowerName"
                type="text"
                placeholder="Enter borrower name"
                value={formData.borrowedBy.borrowerName}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="nationalId">National ID</Label>
              <Input
                id="nationalId"
                name="nationalId"
                type="text"
                placeholder="Enter national ID"
                value={formData.borrowedBy.nationalId}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="productId">Product ID</Label>
              <Input
                id="productId"
                name="productId"
                type="text"
                placeholder="Enter product ID"
                value={formData.borrowedBy.productId}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="borrowingDate">Borrowing Date</Label>
                <Input
                  id="borrowingDate"
                  name="borrowingDate"
                  type="date"
                  value={formData.borrowedBy.borrowingDate}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="returningDate">Returning Date</Label>
                <Input
                  id="returningDate"
                  name="returningDate"
                  type="date"
                  value={formData.borrowedBy.returningDate}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 justify-between flex ">
          <Button className="bg-black text-white p-4">Mark as borrowed</Button>
          <Button className="bg-black text-white p-4">Mark as returned</Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
