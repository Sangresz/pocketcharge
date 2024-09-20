// src/routes/auth/logout/+server.ts
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
  // Clear the PocketBase auth store
  locals.pb.authStore.clear();

  // Optionally, clear any other session data
  locals.user = undefined;

  // Redirect to the login page or home page
  redirect(303, '/');
};