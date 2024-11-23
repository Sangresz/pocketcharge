import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { pb } }) => {
	const [charges, wallets] = await Promise.all([
		pb.collection('charges').getList(1, 10, {
			sort: '-created'
		}),
		pb.collection('wallets').getList(1, 50, {
			sort: '-created'
		})
	]);

	return { 
		charges: charges.items ?? [],
		wallets: wallets.items ?? []
	};
};

export const actions: Actions = {
	createWallet: async ({ request, locals: { pb } }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const balance = data.get('balance')?.toString();
		const icon = data.get('icon')?.toString();
		const currency = data.get('currency')?.toString();

		if (!name || !balance) {
			return fail(400, { error: 'Name and balance are required' });
		}

		try {
			await pb.collection('wallets').create({
				name,
				icon,
				currency,
				balance: parseFloat(balance),
				user_id: pb.authStore.model?.id
			});

			return { type: 'success' };
		} catch (error) {
			console.error('Failed to create wallet:', error);
			return fail(500, { error: 'Failed to create wallet' });
		}
	}
};
