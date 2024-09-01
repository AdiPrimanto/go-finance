import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { LineMdLoadingTwotoneLoop } from "@/components/icons/loading";

const Add = () => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveData = async () => {
    if (!name || !job) {
      toast({
        title: "Error saving data",
        description: "Name and job are required",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, job }),
      });
      setLoading(false);
      const json = await response.json();
      console.log("🚀 ~ saveData ~ json:", json);
      toast({
        title: "Data saved",
        description: "Your data has been saved successfully",
      });

      // Close the dialog and reset the form
      setIsOpen(false);
      setName("");
      setJob("");
    } catch (error) {
      setLoading(false);
      console.error("Error saving data:", error);
      toast({
        title: "Error saving data",
        description: "Please try again later",
      });
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            className="bg-blue-500 rounded-full py-2 px-6 text-white hover:bg-blue-600"
            onClick={() => setIsOpen(true)} // Buka dialog saat tombol diklik
          >
            Add
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Add a new transaction to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-gray-300 outline-none ring-0 ring-gray-300"
            />
            <input
              type="text"
              placeholder="Job"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-gray-300 outline-none ring-0 ring-gray-300"
            />
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => saveData()}
              className="bg-blue-500 rounded-full py-2 px-6 text-white hover:bg-blue-600 flex items-center justify-center"
            >
              {loading && (
                <LineMdLoadingTwotoneLoop className="animate-spin mr-2" />
              )}
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Add;
