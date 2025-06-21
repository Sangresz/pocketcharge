import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (!session) {
		return { groups: [] };
	}

	const { data: groups, error } = await supabase
		.from('groups')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching groups:', error);
		return { groups: [] };
	}

	return {
		groups: groups ?? []
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, safeGetSession } }) => {
		const { session } = await safeGetSession();

		if (!session) {
			return fail(401, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name?.trim()) {
			return fail(400, { error: 'Group name is required' });
		}

		const { data: group, error } = await supabase
			.from('groups')
			.insert([
				{
					name: name.trim(),
				}
			])
			.select()
			.single();

		if (error) {
			console.error('Error creating group:', error);
			return fail(500, { error: 'Failed to create group' });
		}

		return { success: true, group };
	}
};
