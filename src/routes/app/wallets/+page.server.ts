import { supabase } from '$lib/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const wallets = await supabase.from('wallets').select("*").order("balance");

	return { wallets: wallets.data ?? [] };
};
