export const uploadInvoice = (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No file uploaded"

            });

        }

        const pdfUrl =

            `${req.protocol}://${req.get("host")}/uploads/invoices/${req.file.filename}`;

        res.json({

            success: true,

            pdfUrl

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Upload failed"

        });

    }

};