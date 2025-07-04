import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ locals: { user, supabase } }) => {
    const { data: wallets, error: walletsError } = await supabase.from('wallets').select('*').order('created_at');

    if (walletsError) {
        console.error(walletsError);
        return {
            wallets: [],
            groups: []
        }
    }

    const { data: groups, error: groupsError } = await supabase.from('groups')
        .select('id, name, member_groups(id, name, user_id)')
        .order('created_at')
        .or(`user_id.neq.${user?.id},user_id.is.null`, { referencedTable: 'member_groups' });

    if (groupsError) {
        console.error(groupsError);
        return {
            wallets: wallets,
            groups: []
        }
    }

    return {
        wallets: wallets,
        groups: groups
    }
}