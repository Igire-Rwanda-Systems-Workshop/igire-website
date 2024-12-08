"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoWarning } from "react-icons/io5";

export default function DeleteStock({ open, onOpenChange, onClose }) {
  const [products, setProducts] = useState([]);
  const [removeProductId, setRemoveProductId] = useState(null);

  const removeProduct = async () => {
    if (removeProductId) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized. Please log in.");
        }

        const response = await fetch(
          `${API_BASE_URL}/api/Inventory/product/${removeProductId}`,
          { 
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete product.");
        }

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== removeProductId)
        );
        setRemoveProductId(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Delete Product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <p>Are you sure you want to delete this product?</p>
          <div className="flex items-center text-red-500">
            <IoWarning className="mr-2" size={24} />
            <p className="text-sm">: This action cannot be undone!</p>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button onClick={()=> removeProduct} className="bg-red-500 text-white px-4 py-2">Yes, Delete</Button>
          <Button onClick={() => setRemoveProductId(null)} className="bg-gray-300 px-4 py-2">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
