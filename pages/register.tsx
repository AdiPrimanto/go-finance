import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useAuthStore from "../store/useAuthStore";
import { PhEnvelopeSimple } from "@/components/icons/envelope";
import { GameIconsPlainPadlock } from "@/components/icons/padlock";
import { Ring } from "@/components/icons/ring";
import { IonMdPerson } from "@/components/icons/user";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { LineMdLoadingTwotoneLoop } from "@/components/icons/loading";

const Register = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state: any) => state.setUser);
  const user = useAuthStore((state: any) => state.user); // Check user state
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/"); // Redirect to root (dashboard) if already logged in
    }
  }, [user, router]);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("https://reqres.in/api/register", {
        email,
        password,
      });
      setUser(response.data);
      router.push("/dashboard");
      toast({
        title: "Registration successful",
        description: "You have successfully logged in",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Registration failed", error);
      toast({
        title: "Registration failed",
        description: "Please check your email and password",
      });
    }
  };

  return (
    <div className="relative min-h-screen grid grid-cols-12 w-full">
      <div className="col-span-12 md:col-span-8 bg-gradient-to-b from-blue-500 to-blue-900 flex justify-center items-center">
        <div className="flex gap-4 flex-col w-full p-10 md:p-32">
          <h1 className="text-white text-5xl font-bold">GoFinance</h1>
          <h3 className="text-white text-2xl">Hold your future</h3>
          <button
            type="button"
            className="bg-blue-500 rounded-full py-2 px-8 text-white text-base w-fit"
          >
            Read More
          </button>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4 bg-white flex justify-center items-center">
        <form
          onSubmit={handleRegister}
          className="flex gap-4 flex-col w-full p-10 md:p-20"
        >
          <div className="mb-8">
            <h1 className="text-black text-4xl font-bold">Hello!</h1>
            <h3 className="text-black text-2xl">Sign Up to Get Started</h3>
          </div>
          <div className="relative">
            <input
              type="fullname"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 pl-12 rounded-full border-2 border-gray-300 outline-none ring-0 ring-gray-300"
            />
            <IonMdPerson className="absolute top-3.5 left-4 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-12 rounded-full border-2 border-gray-300 outline-none ring-0 ring-gray-300"
            />
            <PhEnvelopeSimple className="absolute top-3.5 left-4 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-12 rounded-full border-2 border-gray-300 outline-none ring-0 ring-gray-300"
            />
            <GameIconsPlainPadlock className="absolute top-3.5 left-4 text-gray-400" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded-full p-3 text-white text-base w-full flex items-center justify-center"
          >
            {loading && (
              <LineMdLoadingTwotoneLoop className="animate-spin mr-2" />
            )}
            Register
          </button>

          <div className="flex gap-4 items-center justify-center text-neutral-400">
            <Link href="/login" className="hover:text-neutral-600">
              Login
            </Link>
          </div>
        </form>
      </div>

      <div className="absolute bottom-0 left-0 z-10 hidden md:block">
        <Ring />
      </div>
    </div>
  );
};

export default Register;
