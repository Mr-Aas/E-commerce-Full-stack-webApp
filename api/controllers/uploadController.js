import cloudinary from "../config/cloudinary.js"



export const uploadImage = async (req, res) => {
  try {
    console.log("body:", req.body); // debug
    console.log("FILE:", req.file); // debug

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ NOW buffer exists
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI);

    res.json({ url: result.secure_url });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};