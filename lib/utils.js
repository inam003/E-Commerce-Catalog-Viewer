import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import supabase from "./supabaseClient";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const userSession = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// export const totalFavoriteProducts = async (user) => {
//   try {
//     const { data, error } = await supabase
//       .from("favorites")
//       .select()
//       .eq("user_id", user.id);

//     if (error) {
//       console.error("Error fetching favorite products:", error);
//     }

//     return data;
//   } catch (error) {
//     console.error("Error fetching favorite products:", error);
//   }
// };
