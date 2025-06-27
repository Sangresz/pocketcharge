import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const [charges] = await Promise.all([
		supabase.from('charges').select('*, groups(id, name), member_charges(member_groups(id, name))').order('created_at', { ascending: false }),
	]);

	if (charges.error) {
		console.error(charges.error);
	}

	return {
		charges: charges.data ?? [],
	};
};