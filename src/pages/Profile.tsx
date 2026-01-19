import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  const { user, refreshUser, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {},
  );

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username ?? "",
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
      });
      setAvatarPreview(user.avatar ?? null);
    }
  }, [user]);

  const handleChange = (k: string, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  const handleAvatarSelect = (file?: File) => {
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSaving(true);
    setErrors({});
    try {
      // Update textual profile — use PATCH per API expectations
      const res = await api.patch("/user", {
        username: form.username,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
      });

      if (res?.data?.status === "success") {
        toast({
          title: "Profile updated",
          description: "Your profile was saved.",
        });
      }

      // Upload avatar if present
      if (avatarFile) {
        const fd = new FormData();
        fd.append("avatar", avatarFile);
        const aRes = await api.post("/user/avatar", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (aRes?.data?.status === "success") {
          toast({
            title: "Avatar uploaded",
            description: "Your avatar was updated.",
          });
          const avatarUrl = aRes?.data?.data?.avatar_url;
          if (avatarUrl) setAvatarPreview(avatarUrl);
        }
      }

      // Refresh auth user after changes
      await refreshUser();
    } catch (rawError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = rawError as any;
      if (err?.response?.status === 422 && err.response.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        const message =
          err instanceof Error ? err.message : "Failed to update profile";
        toast({
          title: "Update failed",
          description: message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await api.post("/auth/verify/send");
      toast({
        title: "Verification sent",
        description: "Check your email for the verification link.",
      });
    } catch (rawError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = rawError as any;
      const message =
        err?.response?.data?.message ??
        (err instanceof Error ? err.message : "Failed to send verification");
      toast({ title: "Failed", description: message, variant: "destructive" });
    }
  };

  const handleDeleteAccount = async () => {
    const ok = confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    );
    if (!ok) return;
    try {
      const res = await api.delete("/user");
      if (res?.data?.status === "success") {
        toast({
          title: "Account deleted",
          description: "Your account was removed.",
        });
        await logout();
        navigate("/");
      }
    } catch (rawError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = rawError as any;
      const message =
        err?.response?.data?.message ??
        (err instanceof Error ? err.message : "Failed to delete account");
      toast({
        title: "Deletion failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className='min-h-screen bg-background text-foreground py-12'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='container mx-auto px-4 max-w-3xl'
      >
        <h1 className='text-3xl font-display font-bold mb-4'>Profile</h1>
        <p className='text-muted-foreground mb-6'>
          Manage your account details and avatar.
        </p>

        <div className='glass p-6 rounded-xl'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
            <div className='flex items-center gap-4'>
              <div>
                <Avatar className='w-20 h-20'>
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} alt='avatar' />
                  ) : (
                    <AvatarFallback>
                      {(user?.first_name || user?.username || "")
                        .charAt(0)
                        ?.toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>

              <div className='flex flex-col gap-2'>
                <input
                  id='avatar'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => handleAvatarSelect(e.target.files?.[0])}
                />
                <div className='flex items-center gap-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => document.getElementById("avatar")?.click()}
                  >
                    Choose file
                  </Button>
                  <div className='text-sm text-muted-foreground'>
                    {avatarFile
                      ? avatarFile.name
                      : avatarPreview
                        ? "Using current avatar"
                        : "No avatar selected"}
                  </div>
                </div>
                <div className='text-sm text-muted-foreground'>
                  Max 5MB. Square avatars recommended.
                </div>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground'>
                First name
              </label>
              <Input
                value={form.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
                className='mt-1'
              />
              {errors.first_name && (
                <div className='text-sm text-destructive mt-1'>
                  {errors.first_name.join(", ")}
                </div>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground'>
                Last name
              </label>
              <Input
                value={form.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                className='mt-1'
              />
              {errors.last_name && (
                <div className='text-sm text-destructive mt-1'>
                  {errors.last_name.join(", ")}
                </div>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground'>
                Username
              </label>
              <Input
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className='mt-1'
              />
              {errors.username && (
                <div className='text-sm text-destructive mt-1'>
                  {errors.username.join(", ")}
                </div>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground'>
                Email
              </label>
              <Input
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className='mt-1'
              />
              {errors.email && (
                <div className='text-sm text-destructive mt-1'>
                  {errors.email.join(", ")}
                </div>
              )}
              <div className='mt-2 flex items-center gap-3'>
                {user?.email_verified_at ? (
                  <div className='text-sm text-green-500'>Email verified</div>
                ) : (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={handleResendVerification}
                  >
                    Resend verification
                  </Button>
                )}
              </div>
            </div>

            <div className='flex gap-3 pt-4'>
              <Button
                type='submit'
                variant='accent'
                size='lg'
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save changes"}
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='lg'
                onClick={() => {
                  setForm({
                    username: user?.username ?? "",
                    first_name: user?.first_name ?? "",
                    last_name: user?.last_name ?? "",
                    email: user?.email ?? "",
                  });
                  setAvatarFile(null);
                  setAvatarPreview(user?.avatar ?? null);
                  setErrors({});
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className='glass p-6 rounded-xl mt-6'>
          <h2 className='text-xl font-semibold mb-4'>Danger Zone</h2>
          <p className='text-sm text-muted-foreground mb-4'>
            Deleting your account is permanent. All data will be removed.
          </p>
          <div className='flex gap-3'>
            <Button variant='destructive' onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
