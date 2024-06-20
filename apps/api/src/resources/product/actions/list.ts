import { AppKoaContext, AppRouter } from 'types';

import productService from '../product.service';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  ctx.body = await productService.find({ userId: user._id });
}

export default (router: AppRouter) => {
  router.get('/private', handler);
};
