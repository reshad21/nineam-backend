import { z } from 'zod';

const rentValidationSchema = z.object({
    body: z.object({
        userId: z.string().min(1),  // Assuming userId is a non-empty string
        bikeId: z.string().min(1),  // Assuming bikeId is a non-empty string
        startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid startTime",
        }),  // Validates if the string can be parsed as a date
        returnTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid returnTime",
        }),  // Validates if the string can be parsed as a date
        totalCost: z.number().positive(),  // Validates if the total cost is a positive number
        isReturned: z.boolean().default(false),  // Default value for isReturned
    }),
});

export const RentValidation = {
    rentValidationSchema,
};
