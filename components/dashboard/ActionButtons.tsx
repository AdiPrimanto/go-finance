import { useState } from "react";
import { useRouter } from "next/router";
import EditDialog from "./edit";
import { toast } from "@/hooks/use-toast";
import { Payment } from "./columns";
import { MaterialSymbolsLightEditOutlineRounded } from "@/components/icons/pencil";
import { MaterialSymbolsDeleteOutlineRounded } from "@/components/icons/trash";

interface ActionButtonsProps {
  payment: Payment;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ payment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    setIsEditing(true); // Membuka dialog edit
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://reqres.in/api/users/${payment.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast({
          title: "Success",
          description: "Payment has been deleted successfully",
        });
        // Lakukan logika tambahan di sini, seperti refresh data
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast({
        title: "Error",
        description: "There was an issue deleting the payment",
      });
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        className="rounded-full bg-neutral-200 p-2 hover:bg-neutral-300"
        onClick={handleEdit}
      >
        <MaterialSymbolsLightEditOutlineRounded className="w-6 h-6" />
      </button>
      <button className="" onClick={handleDelete}>
        <MaterialSymbolsDeleteOutlineRounded className="w-7 h-7" />
      </button>
      <EditDialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        initialData={payment} // Kirim data awal untuk diedit
      />
    </div>
  );
};

export default ActionButtons;
