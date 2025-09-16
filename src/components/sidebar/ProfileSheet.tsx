import { useAuthStore } from "@/store/useAuthStore";
import { SliderSheet } from "../modals/SliderSheet";
import { Button } from "../ui/button";
import { UserForm } from "../forms/UserForm";
import type { UserFormValues } from "@/validations/user.schema";
import { usePut } from "@/hooks/api/useApi";

export const ProfileSheet = ({ open, setOpen }) => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const { execute: updateProfile, loading } = usePut("/auth/profile", {
    isFormData: true,
    onSuccess: (data: {
      user: { id: string; name: string; email: string; image?: string };
    }) => {
      setUser(data.user);
      setOpen(false);
    },
  });

  const handleUpdate = (data: UserFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    updateProfile({ data: formData });
  };

  return (
    <SliderSheet
      open={open}
      onOpenChange={setOpen}
      size="lg"
      title="User Profile"
      footer={
        <Button
          form="user-form"
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      }
    >
      <UserForm
        defaultValues={{
          name: user?.name ?? "",
          email: user?.email ?? "",
          image: user?.image ?? "",
        }}
        onSubmit={handleUpdate}
      />
    </SliderSheet>
  );
};
