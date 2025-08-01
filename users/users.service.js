import userRepository from "./users.repository.js";
import argon2 from "argon2";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    console.info("UserService initialized with repository");
  }

  getAllUsers = async () => {
    return await this.userRepository.getAllUsers();
  };

  getUserById = async (id) => {
    return await this.userRepository.getUserById(id);
  };

  createUser = async (userData) => {
    const hashedPassword = await argon2.hash(userData.password, {
      type: argon2.argon2id,
    });

    const safeUser = {
      ...userData,
      password: hashedPassword,
    };

    return await this.userRepository.createUser(safeUser);
  };

  updateUser = async (id, updateData) => {
    return await this.userRepository.updateUser(id, updateData);
  };

  deleteUser = async (id) => {
    return await this.userRepository.deleteUser(id);
  };
}

export default new UserService(userRepository);
