import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
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
	createGroup: async ({ request, locals: { user, supabase } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name?.trim()) {
			return fail(400, { error: 'Group name is required' });
		}

		let resultGroup = await supabase
			.from('groups')
			.insert([
				{
					name: name.trim(),
				}
			])
			.select()

		if (resultGroup.error || !resultGroup.data) {
			console.error('Error creating group:', resultGroup.error);
			return fail(500, { error: 'Failed to create group' });
		}

		let resultMemberGroup = await supabase
			.from('member_groups')
			.insert([
				{
					user_id: user?.id,
					group_id: resultGroup.data[0].id,
					name: user?.user_metadata.firstName,
				}
			])

		if (resultMemberGroup.error) {
			console.error('Error creating member group:', resultMemberGroup.error);
			return fail(500, { error: 'Failed to create group' });
		}

		return redirect(302, '/app/groups');
	},
	updateGroup: async ({ request, locals: { supabase } }) => {
		const groupId = new URL(request.url).searchParams.get('group_id');

		const form_data = await request.formData();
		const name = form_data.get('name') as string;

		const { error } = await supabase.from('groups').update({
			name,
		}).eq('id', groupId);

		if (error) {
			return fail(500, { error: 'Failed to update group' });
		}

		return redirect(302, '/app/groups');
	}
};
