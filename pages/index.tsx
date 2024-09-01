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

  return null; // Render nothing, since we're redirecting
};

export default Home;
