import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
    getSellerProfile,
    updateSellerProfile, } 
from "@/services/sellerService";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

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
const [fetching, setFetching] = useState(true);
const navigate = useNavigate();

//Load seller profile on mount
useEffect(() => {
    const fetchSellerProfile = async () => {
        try {
            const profile = await getSellerProfile();
            setFormData({
                storeName: profile.storeName || "",
                storeDescription: profile.storeDescription || "",
                returnPolicy: profile.returnPolicy || "",
                city: profile.city || "",
                country: profile.country || "",
                zipCode: profile.zipCode !== undefined && profile.zipCode !== null ? String(profile.zipCode) : "",
                region: profile.region || "",
                addressLine: profile.addressLine || "",
            });
            navigate("/"); // Redirect if profile exists
        } catch (err) {
        setError("Failed to load seller profile.");
      } finally {
        setFetching(false);
      }
    };

    fetchSellerProfile();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);
  
      try {
        await updateSellerProfile({
          ...formData,
          zipCode: Number(formData.zipCode),
        });
        navigate("/");
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to update seller profile. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    if (fetching) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p>Loading profile...</p>
      </div>
    );
}
    return (
        <div className="max-w-md mx-auto mt-10">
          <div className="space-y-6 bg-white p-8 rounded-lg shadow">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">Seller Profile</h2>
              <p className="text-gray-500">
                Update your store information and contact details
              </p>
            </div>
    {error && (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
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
                placeholder="Enter store description"
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
                placeholder="Enter return policy"
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
                type="number"
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
                placeholder="Enter region"
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
                placeholder="Enter address line"
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
              {loading ? "Saving..." : "Save Changes"}
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