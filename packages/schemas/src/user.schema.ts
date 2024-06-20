import { z } from 'zod';

import dbSchema from './db.schema';

export const userSchema = dbSchema
  .extend({
    email: z.string(),
    passwordHash: z.string().nullable().optional(),

    isEmailVerified: z.boolean().default(false),

    signupToken: z.string().nullable().optional(),
    resetPasswordToken: z.string().nullable().optional(),

    lastRequest: z.date().optional(),
  })
  .strict();
