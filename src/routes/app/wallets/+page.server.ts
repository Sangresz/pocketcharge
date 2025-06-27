import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const wallets = await supabase.from('wallets').select("*").order("balance", { ascending: false });

	return { wallets: wallets.data ?? [] };
};

export const actions: Actions = {
	createWallet: async ({ request, locals: { user, supabase } }) => {
		const form_data = await request.formData();
		const name = form_data.get('name') as string;
		const balance = form_data.get('balance') as string;
		const icon = form_data.get('icon') as string;

		if (!name || !balance) {
			return fail(400, { error: 'Name and balance are required' });
		}

		const { error } = await supabase.from('wallets').insert({
			name,
			icon,
			currency: "€",
			balance: parseFloat(balance),
			user_id: user?.id
		});

		if (error) {
			return fail(500, { error: 'Failed to create wallet' });
		}

		return redirect(302, '/app/wallets');
	},
	updateWallet: async ({ request, locals: { supabase } }) => {
		const walletId = new URL(request.url).searchParams.get('wallet_id');

		const form_data = await request.formData();
		const name = form_data.get('name') as string;
		const balance = form_data.get('balance') as string;
		const icon = form_data.get('icon') as string;

		const { error } = await supabase.from('wallets').update({
			name,
			icon,
			balance: parseFloat(balance ?? '0'),
		}).eq('id', walletId);

		if (error) {
			return fail(500, { error: 'Failed to update wallet' });
		}

		return redirect(302, '/app/wallets');
	}
};
