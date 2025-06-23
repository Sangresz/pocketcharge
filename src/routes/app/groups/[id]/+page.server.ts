import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals: { supabase, user } }) => {
    let groupId = params.id;

    const { data: group, error } = await supabase
        .from('groups')
        .select('name, member_groups(name)')
        .eq('id', groupId)
        .limit(1);

    if (error) {
        console.error('Error fetching group:', error);
        redirect(303, '/app/groups');
    }

    if (group.length === 0) {
        redirect(303, '/app/groups');
    }

    return {
        group: group[0]
    };
};