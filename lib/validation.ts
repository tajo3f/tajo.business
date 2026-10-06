import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  niche: z.string().trim().min(2),
  plan: z.enum(["start", "pro", "business"]),
  whatsapp: z.string().regex(/^\d{10,15}$/),
  taxId: z
    .string()
    .optional()
    .transform((v) => (v ? v.replace(/\D/g, "") : ""))
    .refine((v) => !v || v.length === 11 || v.length === 14),
  businessEmail: z.union([z.literal(""), z.email()]).optional(),
});

export const brandSchema = z.object({
  brandName: z.string().trim().min(2).max(120),
  slogan: z.string().trim().max(160).optional(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  accentColor: z.union([z.literal(""), z.string().regex(/^#[0-9a-fA-F]{6}$/)]),
  visualStyle: z.string().trim().max(80).optional(),
});
