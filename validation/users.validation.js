import Joi from "joi";

const validRoles = ["owner", "tenant"];

export const createUserSchema = Joi.object({
  avatar: Joi.string().uri().optional().messages({
    "string.uri": "L'URL de l'avatar n'est pas valide",
  }),

  role: Joi.string()
    .valid(...validRoles)
    .required()
    .messages({
      "any.required": "Le rôle est requis",
      "any.only": `Le rôle doit être soit : ${validRoles.join(" ou ")}`,
    }),

  lastname: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Le nom ne peut pas être vide",
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "string.max": "Le nom ne peut pas dépasser 30 caractères",
    "any.required": "Le nom est requis",
  }),

  firstname: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Le prénom ne peut pas être vide",
    "string.min": "Le prénom doit contenir au moins 2 caractères",
    "string.max": "Le prénom ne peut pas dépasser 30 caractères",
    "any.required": "Le prénom est requis",
  }),

  phone: Joi.string()
    .pattern(/^\+?[0-9\s\-]{7,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Le numéro de téléphone est invalide",
      "any.required": "Le téléphone est requis",
    }),

  email: Joi.string().email().required().messages({
    "string.email": "L'adresse e-mail doit être valide",
    "any.required": "L'e-mail est requis",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    "any.required": "Le mot de passe est requis",
  }),

  confirmpassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Les mots de passe doivent correspondre",
  }),
});

export const updateUserSchema = Joi.object({
  avatar: Joi.string().uri().optional().messages({
    "string.uri": "L'URL de l'avatar n'est pas valide",
  }),

  role: Joi.string()
    .valid(...validRoles)
    .optional()
    .messages({
      "any.only": `Le rôle doit être parmi : ${validRoles.join(", ")}`,
    }),

  lastname: Joi.string().min(2).max(30).optional().messages({
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "string.max": "Le nom ne peut pas dépasser 30 caractères",
  }),

  firstname: Joi.string().min(2).max(30).optional().messages({
    "string.min": "Le prénom doit contenir au moins 2 caractères",
    "string.max": "Le prénom ne peut pas dépasser 30 caractères",
  }),

  phone: Joi.string()
    .pattern(/^\+?[0-9\s\-]{7,15}$/)
    .optional()
    .messages({
      "string.pattern.base": "Le numéro de téléphone est invalide",
    }),

  email: Joi.string().email().optional().messages({
    "string.email": "L'adresse e-mail doit être valide",
  }),

  password: Joi.string().min(6).optional().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
  }),
})
  .min(1)
  .messages({
    "object.min":
      "Au moins un champ doit être fourni pour mettre à jour l'utilisateur",
  });
