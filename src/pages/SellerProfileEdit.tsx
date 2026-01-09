// src/pages/SellerProfileEdit.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import { getSellerProfile, updateSellerProfile } from "@/services/sellerService";

export default function SellerProfileEdit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    returnPolicy: "",
    addressLine: "",
    city: "",
    region: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getSellerProfile();
        setFormData({
          storeName: profile.storeName || "",
          storeDescription: profile.storeDescription || "",
          returnPolicy: profile.returnPolicy || "",
          addressLine: profile.addressLine || "",
          city: profile.city || "",
          region: profile.region || "",
          zipCode: profile.zipCode != null ? String(profile.zipCode) : "",
          country: profile.country || "",
        });
      } catch (err) {
        toast.error("Failed to load your store profile.");
        navigate("/seller/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        zipCode: formData.zipCode.trim() === "" ? undefined : Number(formData.zipCode.trim()),
      };

      await updateSellerProfile(payload);
      toast.success("Store profile updated successfully!");
      navigate("/seller/dashboard");
    } catch (err) {
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="container max-w-4xl mx-auto py-12">Loading profile...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-6">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Store Profile</CardTitle>
          <CardDescription className="text-lg">
            Update your store details. Changes appear instantly to customers.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Store Name */}
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name *</Label>
              <Input
                id="storeName"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                required
                disabled={saving}
              />
            </div>

            {/* Store Description */}
            <div className="space-y-2">
              <Label htmlFor="storeDescription">Store Description</Label>
              <Textarea
                id="storeDescription"
                value={formData.storeDescription}
                onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })}
                rows={5}
                disabled={saving}
                placeholder="Tell customers about your store..."
              />
            </div>

            {/* Return Policy */}
            <div className="space-y-2">
              <Label htmlFor="returnPolicy">Return Policy</Label>
              <Textarea
                id="returnPolicy"
                value={formData.returnPolicy}
                onChange={(e) => setFormData({ ...formData, returnPolicy: e.target.value })}
                rows={4}
                disabled={saving}
              />
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="addressLine">Address Line</Label>
                <Input
                  id="addressLine"
                  value={formData.addressLine}
                  onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region/State</Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setFormData({ ...formData, zipCode: value });
                    }
                  }}
                  disabled={saving}
                  placeholder="e.g., 9000"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  disabled={saving}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/seller/dashboard")}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}