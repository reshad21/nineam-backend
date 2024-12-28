import { z } from "zod";

const SubscriptionValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Name is required.' }),
    }),
});

export const SubscriptionValidation = {
    SubscriptionValidationSchema
}