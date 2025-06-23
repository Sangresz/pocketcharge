import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals: { supabase, user } }) => {
    let groupId = params.id;

    const { data: group, error } = await supabase
        .from('groups')
        .select('id, name, member_groups(name)')
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

export const actions: Actions = {
    addPeople: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const names = formData.getAll('name') as string[];
        const group_id = new URL(request.url).searchParams.get('group_id');

        names.forEach(async (name) => {
            const { error } = await supabase
                .from('member_groups')
                .insert({
                    name,
                    group_id
                })

            if (error) {
                console.error('Error inserting profile:', error);
            }
        })

        redirect(303, '/app/groups/' + group_id);
    }
};