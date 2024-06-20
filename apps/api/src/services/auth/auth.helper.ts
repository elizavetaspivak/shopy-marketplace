import psl from 'psl';
import url from 'url';

import config from 'config';

import { COOKIES } from 'app-constants';
import { AppKoaContext } from 'types';

export const setTokenCookies = ({ ctx, accessToken }: { ctx: AppKoaContext; accessToken: string }) => {
  const parsedUrl = url.parse(config.WEB_URL);

  console.log(parsedUrl, 'parsedUrl');

  if (!parsedUrl.hostname) {
    return;
  }
  console.log(parsedUrl.hostname, 'parsedUrl.hostname');

  const parsed = psl.parse(parsedUrl.hostname) as psl.ParsedDomain;
  const cookiesDomain = parsed.domain || undefined;

  ctx.cookies.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    domain: cookiesDomain,
    expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), // 10 years
  });
};

export const unsetTokenCookies = (ctx: AppKoaContext) => {
  ctx.cookies.set(COOKIES.ACCESS_TOKEN);
};

export default {
  setTokenCookies,
  unsetTokenCookies,
};
