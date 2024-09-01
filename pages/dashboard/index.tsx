import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../../store/useAuthStore";
import Navbar from "@/components/Navbar";
import { Payment, columns } from "@/components/dashboard/columns";
import { DataTable } from "@/components/dashboard/data-table";
import Add from "@/components/dashboard/add";

const Dashboard = () => {
  const [data, setData] = useState<Payment[]>([]); // State untuk menyimpan data pembayaran
  const user = useAuthStore((state: any) => state.user);
  const router = useRouter();
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://reqres.in/api/unknown");
        const json = await response.json();
        const responseData = json.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          year: item.year,
          color: item.color,
        }));

        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (isClient && !user) {
      router.push("/login");
    } else {
      getData(); // Panggil fungsi getData untuk mengambil data
    }
  }, [isClient, user, router]);

  return (
    <>
      <div className="bg-[#f2f2f2] min-h-screen">
        <Navbar />
        <div className="px-20 py-10">
          <Add />

          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
