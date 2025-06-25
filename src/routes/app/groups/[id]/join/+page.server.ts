import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, params, locals: { supabase } }) => {
    const group_name = new URL(url).searchParams.get('group_name');
    let groupId = params.id;

    const { data: member_groups, error } = await supabase
        .from("member_groups")
        .select("*")
        .eq("group_id", groupId)
        .is("user_id", null)

    if (error) {
        console.error('Error fetching group:', error);
        redirect(303, '/app/groups');
    }

    return {
        member_groups,
        group_name,
    }
};

export const actions: Actions = {
    default: async ({ params, request, locals: { supabase, user } }) => {
        const form_data = await request.formData();
        const member_group_id = form_data.get('member') as string;

        const { error } = await supabase
            .from("member_groups")
            .update({
                user_id: user?.id,
            })
            .eq("id", member_group_id)

        if (error) {
            console.error('Error creating member group:', error);
            return fail(500, { error: 'Failed to create group' });
        }

        return redirect(302, '/app/groups/' + params.id);
    }
}