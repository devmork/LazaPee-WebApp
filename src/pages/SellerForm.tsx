import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createSellerProfile } from "@/services/sellerService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios to check for AxiosError

function SellerForm() {
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    returnPolicy: "",
    city: "",
    country: "",
    zipCode: "",
    region: "",
    addressLine: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createSellerProfile({
        ...formData,
        zipCode: formData.zipCode ? Number(formData.zipCode) : undefined,
        status: "Active",
    });
      alert("Seller profile created successfully!\nPlease log out and log back in to access your seller dashboard and features.");
      localStorage.removeItem("auth_token"); //force logout
      navigate("/login");
    } catch (err) {
      let errorMessage = "Failed to create seller profile. Please try again.";

      if (axios.isAxiosError(err)) {
        // This is the most common case for API errors
        const serverError = err.response?.data;

        if (serverError) {
          // Common patterns from ASP.NET Core APIs
          if (typeof serverError === "string") {
            errorMessage = serverError;
          } else if (serverError.message) {
            errorMessage = serverError.message;
          } else if (serverError.title) {
            errorMessage = serverError.title;
          } else if (serverError.errors) {
            // Validation errors (object with field names)
            const validationErrors = Object.values(serverError.errors as Record<string, string[]>)
              .flat()
              .join(", ");
            errorMessage = validationErrors || "Validation failed.";
          }
        } else if (err.response?.status) {
          errorMessage = `Server error: ${err.response.status} ${err.response.statusText || ""}`;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="space-y-6 bg-white p-8 rounded-lg shadow">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Seller Profile</h2>
          <p className="text-gray-500">
            Create your seller profile to start selling your products.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name *</Label>
            <Input
              id="storeName"
              type="text"
              placeholder="Enter store name"
              value={formData.storeName}
              onChange={(e) =>
                setFormData({ ...formData, storeName: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeDescription">Store Description</Label>
            <Textarea
              id="storeDescription"
              placeholder="Tell customers about your store"
              rows={4}
              value={formData.storeDescription}
              onChange={(e) =>
                setFormData({ ...formData, storeDescription: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="returnPolicy">Return Policy</Label>
            <Textarea
              id="returnPolicy"
              placeholder="Describe your return policy"
              rows={4}
              value={formData.returnPolicy}
              onChange={(e) =>
                setFormData({ ...formData, returnPolicy: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              placeholder="Enter country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              type="text"
              placeholder="Enter zip code"
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              type="text"
              placeholder="Enter region/state"
              value={formData.region}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLine">Address Line</Label>
            <Input
              id="addressLine"
              type="text"
              placeholder="Enter street address"
              value={formData.addressLine}
              onChange={(e) =>
                setFormData({ ...formData, addressLine: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Profile"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerForm;