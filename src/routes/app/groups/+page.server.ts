import { fail, redirect } from '@sveltejs/kit';
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
	createGroup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name?.trim()) {
			return fail(400, { error: 'Group name is required' });
		}

		const { error } = await supabase
			.from('groups')
			.insert([
				{
					name: name.trim(),
				}
			])

		if (error) {
			console.error('Error creating group:', error);
			return fail(500, { error: 'Failed to create group' });
		}

		return redirect(302, '/app/groups');
	},
	updateGroup: async ({ request, locals: { supabase } }) => {
		const groupId = new URL(request.url).searchParams.get('group_id');

		const form_data = await request.formData();
		const name = form_data.get('name')?.toString();

		const { error } = await supabase.from('groups').update({
			name,
		}).eq('id', groupId);

		if (error) {
			return fail(500, { error: 'Failed to update group' });
		}

		return redirect(302, '/app/groups');
	}
};
