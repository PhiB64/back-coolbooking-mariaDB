import rentalRepository from "./rentals.repository.js";

class RentalService {
  constructor(rentalRepository) {
    this.rentalRepository = rentalRepository;
    console.info("RentalService initialized with repository");
  }

  async createRental(data) {
    return await this.rentalRepository.createRental(data);
  }

  async getAllRentals() {
    return await this.rentalRepository.getAllRentals();
  }

  async getRentalById(id) {
    return await this.rentalRepository.getRentalById(id);
  }

  async updateRental(id, data) {
    return await this.rentalRepository.updateRental(id, data);
  }

  async deleteRental(id) {
    return await this.rentalRepository.deleteRental(id);
  }
}

export default new RentalService(rentalRepository);
