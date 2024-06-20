import multer from '@koa/multer';
import { z } from 'zod';

import { validateMiddleware } from 'middlewares';

import { AppKoaContext, AppRouter, Next } from 'types';

import config from '../../../config';
import { uploadPhoto } from '../../../services/firebase-storage/firebase-storage.service';
import productService from '../product.service';
import { SaleStatus } from 'schemas/src/product.schema';

const schema = z.object({
  file: z.any(),
  title: z.string().min(1, 'Title is required'),
  price: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { title, price } = ctx.validatedData;

  const { files } = ctx;

  const isProductExists = await productService.exists({ title, price: +price });

  const isFilesNotExist = !files || files.length === 0;

  if (!files || files.length === 0) {
    ctx.assertClientError(isFilesNotExist, {
      email: 'Files not exists',
    });
  }

  ctx.assertClientError(!isProductExists, {
    email: 'Product with this title and price is already exist',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { title, price } = ctx.validatedData;
  const { files } = ctx;
  const { user } = ctx.state;

  const productFiles = files as unknown as multer.File[];

  const photoUrl = await uploadPhoto(productFiles[0], ctx);

  if (photoUrl) {
    await productService.insertOne({
      title,
      saleStatus: SaleStatus.ON_SALE,
      price: +price,
      userId: user._id,
      imageUrl: photoUrl,
      fileReference: productFiles[0].originalname,
    });
  }

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/upload', validateMiddleware(schema), validator, handler);
};
