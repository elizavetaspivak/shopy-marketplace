import { z } from 'zod';

import { productSchema } from 'schemas/src/product.schema';

export type Product = z.infer<typeof productSchema>;
