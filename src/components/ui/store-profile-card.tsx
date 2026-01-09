import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface StoreProfileCardProps {
  storeName: string;
  storeDescription?: string;
  status?: "active" | "pending" | "inactive";
}

export function StoreProfileCard({
  storeName,
  storeDescription = "No description yet. Tell customers about your store!",
  status = "active",
}: StoreProfileCardProps) {
  const navigate = useNavigate();

  const statusConfig = {
    active: { variant: "default" as const, text: "Active" },
    pending: { variant: "secondary" as const, text: "Pending Review" },
    inactive: { variant: "destructive" as const, text: "Inactive" },
  };

  const { variant, text } = statusConfig[status];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold">{storeName}</CardTitle>
              <div className="mt-2">
                <Badge variant={variant}>{text}</Badge>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/seller/profile/edit")}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <CardDescription className="text-base leading-relaxed">
          {storeDescription}
        </CardDescription>
      </CardContent>
    </Card>
  );
}