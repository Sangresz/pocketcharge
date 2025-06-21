import type { PageServerLoad } from './$types';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const [charges, wallets] = await Promise.all([
		supabase.from('charges').select('*').order('created_at').limit(10),
		supabase.from('wallets').select('*').order('created_at').limit(50)
	]);

	return {
		charges: charges.data ?? [],
		wallets: wallets.data ?? []
	};
};

export const actions: Actions = {
	createWallet: async ({ request, locals: { user, supabase } }) => {
		const form_data = await request.formData();
		const name = form_data.get('name')?.toString();
		const balance = form_data.get('balance')?.toString();
		const icon = form_data.get('icon')?.toString();
		const currency = form_data.get('currency')?.toString();

		if (!name || !balance) {
			return fail(400, { error: 'Name and balance are required' });
		}

		const { error } = await supabase.from('wallets').insert({
			name,
			icon,
			currency,
			balance: parseFloat(balance),
			user_id: user?.id
		});

		if (error) {
			return fail(500, { error: 'Failed to create wallet' });
		}

		return redirect(302, '/app');
	}
};
