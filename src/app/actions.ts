"use server";

import { prisma } from "./lib/db";

export async function submitWaitlist(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const product = formData.get("product") as string;
    const frequency = formData.get("frequency") as string;

    if (!name || !email || !product || !frequency) {
      return { success: false, error: "Please fill in all mandatory fields." };
    }

    // Direct entry execution path
    await prisma.waitlist.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        product,
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