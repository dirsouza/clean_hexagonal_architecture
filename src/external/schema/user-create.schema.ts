import { isStrongPassword } from 'validator';
import { z } from 'zod';

export const UserCreateSchema = {
  body: z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .max(20)
      .refine(
        pwd =>
          isStrongPassword(pwd, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          }),
        { message: 'Invalid password' }
      )
  })
};
