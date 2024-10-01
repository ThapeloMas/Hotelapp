import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth); // Get the current user
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
               console.log("User data:", userData);
            setIsAdmin(userData.role === "admin"); // Check if the role is 'admin'
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setCheckingAdmin(false);
        }
      } else {
        setCheckingAdmin(false); // No user logged in
      }
    };

    checkAdminRole();
  }, [user]);

  // Show loading while checking both the authentication and admin status
  if (loading || checkingAdmin) {
    return <p>Loading...</p>;
  }

  // If the user is an admin, render the children components
  if (isAdmin) {
    return children;
  }

  // Redirect to login if not an admin or not logged in
  return <Navigate to="/login" />;
};

export default AdminRoute;
