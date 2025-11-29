import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import rentalService from "./rentals.service.js";

class RentalController {
  constructor(rentalService) {
    this.rentalService = rentalService;
    console.info("RentalController initialized with service");
  }

  async postCreateRental(req, res) {
    try {
      const imageUrls = {};
      const files = req.files;

      for (const key in files) {
        const result = await cloudinary.uploader.upload(files[key][0].path, {
          folder: "coolbooking/rentals",
        });
        imageUrls[key] = result.secure_url;
        fs.unlinkSync(files[key][0].path);
      }

      const rentalData = {
        ...req.body,
        beds: Number(req.body.beds),
        images: imageUrls,
      };

      const rental = await this.rentalService.createRental(rentalData);
      res.status(201).json(rental);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllRentals(req, res) {
    try {
      const rentals = await this.rentalService.getAllRentals();
      res.status(200).json(rentals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getRentalById(req, res) {
    try {
      const rental = await this.rentalService.getRentalById(req.params.id);
      if (!rental)
        return res.status(404).json({ error: "Location non trouvée" });
      res.status(200).json(rental);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateRental(req, res) {
    try {
      const rental = await this.rentalService.updateRental(
        req.params.id,
        req.body
      );
      if (!rental)
        return res.status(404).json({ error: "Location non trouvée" });
      res.status(200).json(rental);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteRental(req, res) {
    try {
      const rental = await this.rentalService.deleteRental(req.params.id);
      if (!rental)
        return res.status(404).json({ error: "Location non trouvée" });
      res.status(200).json({ message: "Location supprimée" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new RentalController(rentalService);
