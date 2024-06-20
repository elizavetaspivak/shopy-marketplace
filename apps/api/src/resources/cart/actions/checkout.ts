import { AppKoaContext, AppRouter } from 'types';
import cartService from '../cart.service';
import config from '../../../config';

const stripe = require('stripe')(config.STRIPE_KEY);

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const carts = await cartService.aggregate([
    {
      $match: {
        userId: user._id,
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'productArray',
      },
    },
    {
      $addFields: {
        product: { $arrayElemAt: ['$productArray', 0] },
      },
    },
    {
      $project: {
        productArray: 0,
        productId: 0,
      },
    },
  ]);

  const lineItems = carts.map((cart) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: cart.product?.title,
        images: [cart.product?.imageUrl],
      },
      unit_amount: Math.round(cart.product?.price * 100),
    },
    quantity: cart.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    client_reference_id: user._id,
    mode: 'payment',
    success_url: config.STRIPE_SUCCESS_URL,
    cancel_url: config.STRIPE_CANCEL_URL,
  });

  ctx.body = { id: session.id };
}

export default (router: AppRouter) => {
  router.post('/create-checkout-session', handler);
};
