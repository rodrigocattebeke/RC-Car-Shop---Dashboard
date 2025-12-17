import { uploadImageToCloudinaryService } from "@/services/cloudinary/cloudinaryService";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PRODUCTS_COLLECTION = "products";

export const uploadProductService = async (formData) => {
  try {
    // Upload image to Cloudinary
    const imageResult = await uploadImageToCloudinaryService(formData);
    console.log(imageResult);
    if (!imageResult.ok) {
      return { ok: false, error: "Image upload failed" };
    }

    // Product object without image
    const productData = {};

    for (const [key, value] of formData.entries()) {
      if (key !== "image") {
        productData[key] = value;
      }
    }

    // Add URL
    productData.photoURL = imageResult.url;
    productData.createdAt = serverTimestamp();
    productData.updatedAt = serverTimestamp();

    // Save in Firestore
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);

    return {
      ok: true,
      id: docRef.id,
      product: {
        ...productData,
        photoURL: imageResult.url,
      },
    };
  } catch (error) {
    console.error("Upload product error:", error);
    return { ok: false, error: error.message };
  }
};
