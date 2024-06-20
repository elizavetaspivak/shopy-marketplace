import { z } from 'zod';

import { validateMiddleware } from 'middlewares';

import { AppKoaContext, AppRouter, Next } from 'types';

import productService from '../product.service';
import cartService from '../../cart/cart.service';

const schema = z
  .object({
    productId: z.string().min(1, 'productId must be a long string'),
  })
  .strict();

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { productId } = ctx.validatedData;

  const isProductExists = await productService.exists({ _id: productId });

  ctx.assertClientError(isProductExists, {
    productId: 'Product not found!',
  });

  const isCartExists = await cartService.exists({ productId: productId });

  ctx.assertClientError(!isCartExists, {
    productId: 'This Product attach to cart!',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { productId } = ctx.validatedData;

  await productService.deleteOne({ _id: productId });

  ctx.body = productId;

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.delete('/delete', validateMiddleware(schema), validator, handler);
};
