import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../inputs/InputField";
import { userSchema, type UserFormValues } from "@/validations/user.schema";
import { ImageUploader } from "../inputs/ImageUploader";
import { UserIcon } from "lucide-react";

type Props = {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (data: UserFormValues) => void;
};

export const UserForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  return (
    <form
      id="user-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Avatar</label>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, name } }) => (
            <ImageUploader
              name={name}
              onChange={onChange}
              size="lg"
              rounded="full"
              containerClassName="flex justify-center"
              value={defaultValues?.image}
              placeholder={{
                icon: <UserIcon size={30} />,
                title: "User Image",
                subtitle: undefined,
              }}
            />
          )}
        />
      </div>
      <InputField
        label="Name"
        type="text"
        error={errors.name?.message}
        {...register("name")}
      />
      <InputField
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
    </form>
  );
};
