import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: wallets } = await supabase.from('wallets').select('name,icon,currency,balance');

	return { wallets: wallets ?? [] };
};
