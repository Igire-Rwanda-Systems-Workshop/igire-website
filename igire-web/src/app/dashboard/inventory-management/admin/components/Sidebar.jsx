"use client";

import {
  Menu,
  LayoutDashboard,
  User,
  SlidersHorizontal,
  CircleDollarSign,
  Store
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import logo from "@/favicon.ico";

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }) => {
  const pathname = usePathname();

  // Determine if the link is active
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-white hover:bg-green-200 gap-3 transition-colors ${
          isActive ? "bg-green-200 text-white" : ""
        }`}
      >
        <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-700"}`} />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium ${isActive ? "text-white" : "text-gray-700"}`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const SideBar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile screens

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarClassName = `fixed flex flex-col font-ibm ${
    isSidebarCollapsed ? "w-16" : "w-64"
  } bg-white transition-all duration-500 overflow-hidden h-full shadow-md z-40 md:relative md:translate-x-0 ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:flex md:w-sm`;

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-full shadow-md md:hidden font-ibm"
        onClick={toggleMobileSidebar}
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <div className={sidebarClassName}>
        {/* TOP LOGO */}
        <div
          className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
            isSidebarCollapsed ? "px-5" : "px-8"
          }`}
        >
          <div>
            <Image src={logo} alt="logo" width={80} height={80} />
          </div>
          <h1
            className={`${
              isSidebarCollapsed ? "hidden" : "block"
            } font-extrabold text-xl`}
          >
            Inventory management
          </h1>
        </div>
        <div className="flex mt-10 items-center justify-center"> 
  <h3
    className={`${
      isSidebarCollapsed ? "hidden" : "block"
    } text-xl  text-green-700`}
  >
    Admin
  </h3>
</div>
        {/* LINKS */}
        <div className="flex-grow mt-10 ">
          <SidebarLink
            href="/dashboard/inventory-management/admin"
            icon={User}
            label="Users"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            href="/dashboard/inventory-management/admin/profile"
            icon={SlidersHorizontal}
            label="Settings"
            isCollapsed={isSidebarCollapsed}
          />
        </div>

        {/* FOOTER */}
        <div className="block mb-10">
          <p className="text-center text-xs text-gray-500">
            &copy; 2024 igire rwanda org
          </p>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
};

export default SideBar;
