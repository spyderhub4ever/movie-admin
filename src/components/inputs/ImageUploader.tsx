import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useCallback, useState } from "react";

interface ImageUploaderProps {
  name: string;
  onChange: (files: FileList | null) => void;
  error?: string;
  className?: string;
  containerClassName?: string;
  placeholder?: {
    icon?: React.ReactNode;
    title?: string;
    subtitle?: string;
  };
  maxSize?: number; // in MB
  accept?: string;
  value?: string; // Current image URL
  size?: "sm" | "md" | "lg" | "xl"; // new prop
  rounded?: "none" | "sm" | "md" | "lg" | "full"; // new prop
}

const sizeMap: Record<string, string> = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

const roundedMap: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const ImageUploader = ({
  name,
  onChange,
  error,
  className = "",
  containerClassName = "",
  placeholder,
  maxSize = 10,
  accept = "image/*",
  value,
  size = "lg",
  rounded = "full",
}: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<string | null>(value || null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0 && validateFile(files[0])) {
        handleFiles(files);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxSize]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0 && validateFile(files[0])) {
        handleFiles(files);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxSize]
  );

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) return false;
    if (file.size > maxSize * 1024 * 1024) return false;
    return true;
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    onChange(files);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const clearPreview = () => {
    setImage(null);
    onChange(null);
  };

  const currentPlaceholder = {
    icon: <Upload size={32} />,
    title: "Drop image here or click to browse",
    subtitle: `PNG, JPG, GIF up to ${maxSize}MB`,
    ...placeholder,
  };

  return (
    <div className={containerClassName}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          `relative aspect-square border-2 border-dashed flex items-center justify-center transition-all duration-200`,
          sizeMap[size],
          roundedMap[rounded],
          isDragging
            ? "border-blue-500 bg-blue-500/10 scale-105"
            : "border-slate-600 hover:border-slate-500 hover:opacity-70",
          image && "border-slate-400 border-solid",
          error && "border-red-500 border-solid",
          className
        )}
      >
        {image ? (
          <>
            <img
              src={image}
              alt="Preview"
              className={cn("w-full h-full object-cover", roundedMap[rounded])}
            />
            <button
              type="button"
              onClick={clearPreview}
              className="absolute cursor-pointer  top-0.5 right-0.5 bg-red-500 hover:bg-red-700 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <label
            htmlFor={name}
            className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-slate-400 hover:text-slate-300 transition-colors p-4 text-center"
          >
            <div className="mb-3 opacity-60">{currentPlaceholder.icon}</div>
            {currentPlaceholder.title && (
              <p className="text-sm font-medium mb-1">
                {currentPlaceholder.title}
              </p>
            )}
            {currentPlaceholder.subtitle && (
              <p className="text-xs opacity-70">
                {currentPlaceholder.subtitle}
              </p>
            )}
          </label>
        )}

        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
