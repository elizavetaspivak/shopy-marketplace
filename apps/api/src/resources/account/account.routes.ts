import {routeUtil} from 'utils';

import get from './actions/get';
import resendEmail from './actions/resend-email';
import resetPassword from './actions/reset-password';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import signUp from './actions/sign-up';
import update from './actions/update';
import verifyEmail from './actions/verify-email';
import verifyResetToken from './actions/verify-reset-token';

const publicRoutes = routeUtil.getRoutes([
  signUp,
  signIn,
  signOut,
  verifyEmail,
  resetPassword,
  verifyResetToken,
  resendEmail,
]);

const privateRoutes = routeUtil.getRoutes([get, update]);


export default {
  publicRoutes,
  privateRoutes,
};
