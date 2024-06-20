import { z } from 'zod';

import { cartSchema } from 'schemas/src/cart.schema';

export type Cart = z.infer<typeof cartSchema>;
