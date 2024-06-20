import { AppKoaContext, AppRouter } from 'types';
import cartService from '../cart.service';
import { PaymentStatus } from 'schemas/src/cart.schema';
import bodyParser from 'koa-bodyparser';
import config from '../../../config';

const endpointSecret = config.STRIPE_ENDPOINT_SECRET;

const stripe = require('stripe')(config.STRIPE_KEY);

async function handler(ctx: AppKoaContext) {
  const sig = ctx.request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(ctx.request.rawBody, sig, endpointSecret);
  } catch (err) {
    ctx.status = 400;
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const intent = event.data.object;

      if (intent.payment_status === 'paid') {
        await cartService.updateMany(
          { userId: intent.client_reference_id, paymentStatus: PaymentStatus.INPROGRESS },
          () => ({
            paymentStatus: PaymentStatus.SUCCEDED,
            paymentDate: new Date(),
          }),
        );
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/webhook', bodyParser({ enableTypes: ['json'] }), handler);
};
