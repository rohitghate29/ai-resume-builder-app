import { SignIn } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

function Signin() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      {loading ? <Loader className="animate-spin" /> : <SignIn />}
    </div>
  );
}

export default Signin;
