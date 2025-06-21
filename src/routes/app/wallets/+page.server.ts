import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const wallets = await supabase.from('wallets').select("*").order("balance");

	return { wallets: wallets.data ?? [] };
};
