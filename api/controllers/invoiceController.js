import supabase from "../config/supabase.js";

export const uploadInvoice = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No PDF uploaded",

            });

        }

        const fileName =
            `${Date.now()}-${req.file.originalname}`;

        const { error } =
            await supabase.storage
                .from(process.env.SUPABASE_BUCKET)
                .upload(fileName, req.file.buffer, {

                    contentType: "application/pdf",

                    upsert: false,

                });

        if (error) {

            console.log(error);

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

        const { data } =
            supabase.storage
                .from(process.env.SUPABASE_BUCKET)
                .getPublicUrl(fileName);

        res.status(200).json({

            success: true,

            pdfUrl: data.publicUrl,

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Upload failed",

        });

    }

};