// src/components/DeleteSellerModal.tsx

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import { deleteSellerProfile } from "@/services/sellerService";

interface DeleteSellerModalProps {
  onDeleted: () => void;
}

// ← THIS IS THE CORRECT NAMED EXPORT
export function DeleteSellerModal({ onDeleted }: DeleteSellerModalProps) {
  const handleDelete = async () => {
    try {
      await deleteSellerProfile();
      onDeleted();
    } catch (err) {
      console.error("Failed to delete seller profile", err);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Seller Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action <strong>cannot be undone</strong>. This will permanently delete:
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Your store profile and name</li>
              <li>All products you've listed</li>
              <li>Your seller status and dashboard access</li>
            </ul>
            <p className="mt-4 font-medium text-green-600">
              Your main LazaPee account will remain active. You can still shop and create a new seller account later.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Yes, delete my seller account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}