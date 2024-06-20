import { z } from 'zod';

import dbSchema from './db.schema';

export enum SaleStatus {
  SOLD = 'sold',
  ON_SALE = 'onSale',
}

export const productSchema = dbSchema
  .extend({
    title: z.string(),
    price: z.number(),

    userId: z.string(),

    imageUrl: z.string(),
    saleStatus: z.nativeEnum(SaleStatus),
    fileReference: z.string(),
  })
  .strict();
