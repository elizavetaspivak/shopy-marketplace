import { z } from 'zod';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { securityUtil } from 'utils';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'app-constants';
import { AppKoaContext, AppRouter, Next } from 'types';
import { authService } from '../../../services';
import config from '../../../config';

const schema = z.object({
  email: z.string().toLowerCase().regex(EMAIL_REGEX, 'Email format is incorrect.'),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).',
    ),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { email } = ctx.validatedData;

  const isUserExists = await userService.exists({ email });

  ctx.assertClientError(!isUserExists, {
    email: 'User with this email is already registered',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { email, password } = ctx.validatedData;

  const [hash, signupToken] = await Promise.all([securityUtil.getHash(password), securityUtil.generateSecureToken()]);

  const user = await userService.insertOne({
    email,
    passwordHash: hash.toString(),
    isEmailVerified: true,
    signupToken,
  });

  await Promise.all([userService.updateLastRequest(user._id), authService.setTokens(ctx, user._id)]);

  ctx.body = { signupToken };
}

export default (router: AppRouter) => {
  router.post('/sign-up', validateMiddleware(schema), validator, handler);
};
