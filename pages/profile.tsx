import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../store/useAuthStore";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { LineMdLoadingTwotoneLoop } from "@/components/icons/loading";

const Profile = () => {
  const user = useAuthStore((state: any) => state.user); // Ambil state user dari zustand
  const logout = useAuthStore((state: any) => state.logout);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isClient = typeof window !== "undefined"; // Periksa apakah sedang di klien

  useEffect(() => {
    if (isClient && !user) {
      router.push("/login"); // Redirect ke login jika user belum login
    }
  }, [isClient, user, router]);

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      logout();
      router.push("/login");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="bg-[#f2f2f2] min-h-screen">
      <Navbar />

      <div className="px-20 py-10">
        <Link href="/dashboard">
          <h1 className="text-neutral-500 font-bold text-4xl">
            JASON LEE L.W.
          </h1>
        </Link>
        <h3 className="text-neutral-700">Sales Lead</h3>
        {/* <p>Email: {user}</p> */}
        <button
          onClick={handleLogout}
          className="bg-red-500 rounded-full py-2 px-6 text-white text-base w-fit mt-24 hover:bg-red-600 flex items-center justify-center"
        >
          {loading && (
            <LineMdLoadingTwotoneLoop className="animate-spin mr-2" />
          )}
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
