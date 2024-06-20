import { routeUtil } from '../../utils';
import count from './actions/count';
import create from './actions/create';
import list from './actions/list';
import remove from './actions/remove';
import update from './actions/update';
import checkout from './actions/checkout';
import webhook from './actions/paymentWebhook';
import history from './actions/history';

const privateRoutes = routeUtil.getRoutes([history, checkout, count, create, list, update, remove]);
const webhookRoutes = routeUtil.getRoutes([webhook]);

export default {
  privateRoutes,
  webhookRoutes,
};
