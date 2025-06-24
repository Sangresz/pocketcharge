import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals: { user, supabase } }) => {
        const form_data = await request.formData();

        const name = form_data.get('name') as string;
        const amount = form_data.get('amount') as string;
        const is_expense = form_data.get('is_expense') as string;
        const wallet_id = form_data.get('wallet');

        const { error } = await supabase.from('charges').insert({
            name,
            amount: parseInt(amount),
            is_expense: is_expense === 'on',
            wallet_id: wallet_id == "" ? null : wallet_id,
            user_id: user?.id
        })

        if (error) {
            console.log(error)
            return fail(500, { error: 'Failed to update group' });
        }

        redirect(303, '/app');
    }
}