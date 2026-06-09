"use server";

import { prisma } from "./lib/db";

export async function submitWaitlist(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    
    // Use getAll to collect all checked values from the "products" checkboxes
    const selectedProducts = formData.getAll("products") as string[];
    const frequency = formData.get("frequency") as string;

    if (!name || !email || selectedProducts.length === 0 || !frequency) {
      return { success: false, error: "Please fill in all mandatory fields." };
    }

    // Convert the array of choices into a single comma-separated string
    // This allows it to save directly into your existing text/string column without breaking your schema
    const productString = selectedProducts.join(", ");

    // Direct entry execution path
    await prisma.waitlist.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        product: productString, 
        frequency,
      },
    });

    return { success: true };
    
  } catch (error: any) {
    console.error("Database submission failure:", error);

    if (error.code === "P2002") {
      return { success: false, error: "This email address is already registered on the waitlist." };
    }

    return { 
      success: false, 
      error: "Unable to process submission at this time. Please check your connection." 
    };
  }
}