import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals: { user, supabase } }) => {
        const form_data = await request.formData();

        const name = form_data.get('name') as string;
        const amount = form_data.get('amount') as string;
        const is_expense = form_data.get('is_expense') as string;

        const { error } = await supabase.from('charges').insert({
            name,
            amount: parseInt(amount),
            is_expense: is_expense === 'on',
            user_id: user?.id
        })

        if (error) {
            return fail(500, { error: 'Failed to update group' });
        }

        redirect(303, '/app');
    }
}