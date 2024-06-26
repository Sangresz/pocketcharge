import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: charges } = await supabase.from('charges').select('name,amount,is_expense');

	return { charges: charges ?? [] };
};
