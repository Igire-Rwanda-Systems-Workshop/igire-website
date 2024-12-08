// "use client";  // Mark this as a Client Component

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { useRouter } from "next/navigation"; 

// // Dynamically import jwt-decode
// let jwtDecode;

// if (typeof window !== "undefined") {
//   import("jwt-decode").then((module) => {
//     jwtDecode = module.default;
//   });
// }

// export default function Profile() {
//   const [user, setUser] = useState(null);  // Using user.data
//   const [error, setError] = useState(null);
//   const router = useRouter(); 

//   // Fetch user profile from localStorage and decode the token
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("No token found, please log in.");
//       router.push("/login");  // Redirect to login if no token
//       return;
//     }

//     try {
//       if (jwtDecode) {
//         const decodedToken = jwtDecode(token);  // Decode JWT token

//         // Log the decoded token data for debugging
//         console.log("Decoded Token Data:", token);  // This will log the user data in the console

//         // Assuming user data is coming from decodedToken
//         setUser({
//           data: {
//             id: decodedToken.userId || "Not available",
//             name: decodedToken.name || "Not available",
//             email: decodedToken.email || "Not available",
//             role: decodedToken.role || "Not available",
//           }
//         });
//       }
//     } catch (error) {
//       setError("Failed to decode the token.");
//       console.error(error);
//     }
//   }, [router]);  // Rerun the effect when router changes

//   // Handling error or loading state
//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!user) {
//     return <div>Loading profile...</div>;
//   }

//   return (
//     <div className="flex justify-center mt-4 font-ibm">
//       <Card className="w-full max-w-2xl border p-3">
//         <CardHeader>
//           <CardTitle className="text-xl">User Profile</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             <div>
//               <strong>ID:</strong> {user.data.id}
//             </div>
//             <div>
//               <strong>Name:</strong> {user.data.name}
//             </div>
//             <div>
//               <strong>Email:</strong> {user.data.email}
//             </div>
//             <div>
//               <strong>Role:</strong> {user.data.role}
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button className="w-full flex items-center justify-center bg-black text-white">
//             Edit Profile
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
