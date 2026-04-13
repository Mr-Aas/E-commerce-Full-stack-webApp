// controllers/addressController.js
import Address from "../models/address.js";

export const addAddress = async (req, res) => {
    try {

        // 🔥 If new address is default → remove old default
        if (req.body.isDefault) {
            await Address.updateMany(
                { userId: req.user.id },
                { isDefault: false }
            );
        }
        const existingAddresses = await Address.find({
            userId: req.user.id,
            isDeleted: false
        });

        if (existingAddresses.length === 0) {
            req.body.isDefault = true;
        }

        const newAddress = await Address.create({
            ...req.body,
            userId: req.user.id
        });

        res.status(201).json(newAddress);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAddresses = async (req, res) => {
  const addresses = await Address.find({
    userId: req.user.id,
    isDeleted: false
  });

  res.json(addresses);
};

export const editaddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });


        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        Object.assign(address, req.body);

        // ⚠️ handle default logic here (explained below)
        if (req.body.isDefault) {
            await Address.updateMany(
                { userId: req.user.id },
                { isDefault: false }
            );
        }

        await address.save();

        res.json(address);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const deletaAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        address.isDeleted = true;
        await address.save();

        res.json({ message: "Address deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const  getaddressbyId= async (req, res) => {
  const address = await Address.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  res.json(address);
}
