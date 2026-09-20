"use server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SCREENSHOTS_BUCKET = "account-screenshots";
const MAX_SCREENSHOTS = 5;
const MAX_FILE_SIZE_MB = 5;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitAccountListing(prevState, formData) {
  const sellerName = formData.get("sellerName")?.toString().trim();
  const sellerEmail = formData.get("sellerEmail")?.toString().trim();
  const gameName = formData.get("gameName")?.toString().trim();
  const accountTitle = formData.get("accountTitle")?.toString().trim();
  const price = formData.get("price")?.toString().trim();
  const description = formData.get("description")?.toString().trim() || "";
  const honeypot = formData.get("website");

  if (honeypot) {
    return { success: false, error: "Something went wrong." };
  }

  if (!sellerName || !sellerEmail || !gameName || !accountTitle || !price) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!EMAIL_REGEX.test(sellerEmail)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const parsedPrice = Number(price);
  if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
    return { success: false, error: "Please enter a valid price." };
  }

  const screenshots = formData
    .getAll("screenshots")
    .filter((file) => file instanceof File && file.size > 0);

  if (screenshots.length === 0) {
    return { success: false, error: "Please attach at least one screenshot." };
  }

  if (screenshots.length > MAX_SCREENSHOTS) {
    return { success: false, error: `Maximum ${MAX_SCREENSHOTS} screenshots allowed.` };
  }

  for (const file of screenshots) {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return { success: false, error: `Each screenshot must be under ${MAX_FILE_SIZE_MB}MB.` };
    }
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "Only image files are allowed for screenshots." };
    }
  }

  const listingId = crypto.randomUUID();
  const uploadedUrls = [];

  for (const [index, file] of screenshots.entries()) {
    const extension = file.name.split(".").pop() || "jpg";
    const path = `${listingId}/${index}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(SCREENSHOTS_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return { success: false, error: "Failed to upload screenshots. Please try again." };
    }

    const { data: publicUrlData } = supabase.storage
      .from(SCREENSHOTS_BUCKET)
      .getPublicUrl(path);

    uploadedUrls.push(publicUrlData.publicUrl);
  }
  
  const { error: insertError } = await supabase.from("account_listings").insert([
    {
      id: listingId,
      seller_name: sellerName,
      seller_email: sellerEmail,
      game_name: gameName,
      account_title: accountTitle,
      price: parsedPrice,
      description,
      screenshot_urls: uploadedUrls,
      status: "pending"
    }
  ]);

  if (insertError) {
    console.error("Supabase insert error:", insertError);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true, error: "" };
}
