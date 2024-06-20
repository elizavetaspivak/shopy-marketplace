import { Cart } from 'app-types/src/cart.types';

import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { cartSchema } from 'schemas/src/cart.schema';

const service = db.createService<Cart>(DATABASE_DOCUMENTS.CART, {
  schemaValidator: (obj) => cartSchema.parseAsync(obj),
});

export default service;
