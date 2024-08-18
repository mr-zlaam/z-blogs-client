import { toast } from "sonner";

export const useMessage = () => {
  const successMessage = (message: string) => {
    toast.success(message, {
      duration: 4000,
      className: "text-foreground bg-background select-none",
      position: "bottom-right",
    });
  };
  const errorMessage = (message: string) => {
    toast.error(message, {
      duration: 4000,
      className: "text-red-600 select-none",
      position: "bottom-right",
    });
  };
  return { successMessage, errorMessage };
};
