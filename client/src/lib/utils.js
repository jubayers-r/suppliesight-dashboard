import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const getProductStatus = (product) => {
  if (product.stock > product.demand) return "Healthy";
  if (product.stock === product.demand) return "Low";
  return "Critical";
};

export const getStatusVariant = (status) => {
  switch (status) {
    case "Healthy":
      return "default";
    case "Low":
      return "secondary";
    case "Critical":
      return "destructive";
    default:
      return "outline";
  }
};