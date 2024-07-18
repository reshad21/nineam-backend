import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object(
    {
      // id: z.string(),
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().max(8),
      phone: z.string().min(1),
      address: z.string().min(1),
      role: z.enum(['admin', 'user']),
    }
  )
});

export const UserValidation = {
  userValidationSchema,
};
