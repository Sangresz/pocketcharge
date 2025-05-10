import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';

export const handle = async ({event, resolve}) => {
  event.locals.pb = new PocketBase("http://127.0.0.1:8090/");
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  if (event.locals.pb.authStore.isValid) {
    event.locals.user = event.locals.pb.authStore.model;
  } else {
    event.locals.user = undefined;
  }

  const response = await resolve(event);

  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

  if (event.locals.pb.authStore.isValid) {
    if (event.url.pathname === '/' || event.url.pathname.includes("/auth")) {
      return redirect(303, '/app');
    }
  } else {
    if (event.url.pathname.includes("/app")) {
      return redirect(303, '/auth/login');
    }
  }

  return response;
};