import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { pb } }) => {
	const wallets = await pb.collection('wallets').getFullList({sort: "-balance"});

	return { wallets: wallets ?? [] };
};
