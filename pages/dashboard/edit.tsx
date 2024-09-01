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

const Edit = ({ isOpen, onClose, initialData }: any) => {
  const [name, setName] = useState(initialData.name || "");
  const [job, setJob] = useState(initialData.job || "");
  const [loading, setLoading] = useState(false);

  const saveData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://reqres.in/api/users/${initialData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, job }),
        }
      );
      setLoading(false);
      const json = await response.json();
      console.log("🚀 ~ saveData ~ json:", json);
      toast({
        title: "Data updated",
        description: "Your data has been updated successfully",
      });

      // Close the dialog and reset the form
      onClose();
    } catch (error) {
      setLoading(false);
      console.error("Error saving data:", error);
      toast({
        title: "Error updating data",
        description: "Please try again later",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Edit the transaction details below.
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
  );
};

export default Edit;
