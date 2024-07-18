import { z } from 'zod';

const bikeValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        pricePerHour: z.number().positive(),
        isAvailable: z.boolean().default(true),
        cc: z.number().positive(),
        year: z.number().int().min(1885),
        model: z.string().min(1),
        brand: z.string().min(1),
    }),
});

export const BikeValidation = {
    bikeValidationSchema,
};
export default bikeValidationSchema;
