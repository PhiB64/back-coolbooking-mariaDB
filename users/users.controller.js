import userService from "./users.service.js";
import cloudinary from "../config/Cloudinary.js";
import fs from "fs";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/users.validation.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
    console.info("UserController initialized with service");
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const { error } = createUserSchema.validate(req.body);
      if (error)
        throw new Error("Validation échouée : " + error.details[0].message);

      let avatarUrl;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "avatars",
          transformation: [{ width: 300, height: 300, crop: "fill" }],
        });
        avatarUrl = result.secure_url;
        fs.unlinkSync(req.file.path);
      } else {
        avatarUrl =
          "https://res.cloudinary.com/dwkyezu2u/image/upload/v1745506223/download_zspjbi.png";
      }

      const userData = {
        ...req.body,
        avatar: avatarUrl,
      };

      const newUser = await this.userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { error } = updateUserSchema.validate(req.body);
      if (error)
        throw new Error("Validation échouée : " + error.details[0].message);

      const updatedUser = await this.userService.updateUser(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}

console.log("userService:", userService);

export default new UserController(userService);
