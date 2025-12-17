const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

export const uploadImageToCloudinaryService = async (formData) => {
  try {
    const file = formData.get("image");

    if (!file) {
      return {
        ok: true,
        url: "https://res.cloudinary.com/manduapp/image/upload/v1765917352/not-found_anmtay.jpg",
      };
    }

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(BASE_URL, {
      method: "POST",
      body: cloudinaryFormData,
    });

    if (!res.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const data = await res.json();

    return {
      ok: true,
      url: data.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary error:", error);
    return { ok: false, error: error.message };
  }
};
