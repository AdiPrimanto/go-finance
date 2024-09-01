import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../store/useAuthStore";

const Home = () => {
  const router = useRouter();
  const user = useAuthStore((state: any) => state.user);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p>Loading...</p>
    </div>
  );
};

export default Home;
