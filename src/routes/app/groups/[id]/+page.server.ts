import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import type { Tables } from '$lib/database.types';

export const load: PageServerLoad = async ({ params, locals: { user, supabase } }) => {
    let groupId = params.id;

    const { data: group, error } = await supabase
        .from('groups')
        .select('id, name, member_groups(id, name, user_id), charges(name, amount, created_at, member_charges(id, amount, member_group_id), user_id)')
        .eq('id', groupId)
        .single();

    if (error) {
        console.error('Error fetching group:', error);
        redirect(303, '/app/groups');
    }

    // We want the current user to be the first one displayed
    group.member_groups =
        group.member_groups
            .sort((a: any, b: any) => {
                return (a.user_id == user?.id) ? -1 : 1;
            })

    const members = group.member_groups;

    const myMemberGroup = members.find((m: any) => m.user_id === user?.id);

    const charges = group.charges;

    group.member_groups = members.map((member: any) => {
        if (member.user_id === user?.id) return member; // Skip yourself

        let credit = 0; // What they owe you
        let debit = 0;  // What you owe them

        for (const charge of charges) {
            const memberCharges = charge.member_charges;

            // Find if this member participated in this charge
            const memberCharge = memberCharges.find((mc: any) => mc.member_group_id === member.id);

            // Find if you participated in this charge
            const yourCharge = memberCharges.find((mc: any) => mc.member_group_id === myMemberGroup.id);

            if (charge.user_id === user?.id && memberCharge) {
                // You paid, they participated = they owe you
                credit += memberCharge.amount;
            } else if (charge.user_id === member.user_id && yourCharge) {
                // They paid, you participated = you owe them
                debit += yourCharge.amount;
            }
        }

        return {
            ...member,
            balance: credit - debit,
            credit,
            debit
        };
    });

    group.charges.sort((a: any, b: any) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return {
        group: group,
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