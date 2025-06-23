// src/routes/auth/logout/+server.ts
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error(error);
	}

	redirect(303, '/');
};