import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return; // Ensure function exits after sending response
    }

    next(); // Explicitly return next() to match void | Promise<void>
  };
};


export const loginValidator = [
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Email must be a valid email address"),
  
    body("password")
      .trim()
      .notEmpty().withMessage("Password is required")
      .isString().withMessage("Password must be a string")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ];
  

export const signupValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters"),
    ...loginValidator,
    
];

export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is required")
    
];



