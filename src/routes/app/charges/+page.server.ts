import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    new: async ({ request, locals: { user, supabase } }) => {
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
            return fail(500, { error: 'Failed to create charge' });
        }

        const { data: wallet, error: queryingWalletError } = await supabase.from('wallets').select('*').eq('id', wallet_id).single();

        if (queryingWalletError) {
            console.log(queryingWalletError)
            return fail(500, { error: 'Failed to get wallet' });
        }

        const updateValue = is_expense === 'on' ? wallet.balance - parseInt(amount) : wallet.balance + parseInt(amount);

        const { error: updateWalletError } = await supabase.from('wallets').update({
            balance: updateValue
        }).eq('id', wallet_id)

        if (updateWalletError) {
            console.log(updateWalletError)
            return fail(500, { error: 'Failed to update wallet' });
        }

        redirect(303, '/app');
    },
    update: async ({ request, locals: { user, supabase } }) => {
        const charge_id = new URL(request.url).searchParams.get('charge_id');
        const form_data = await request.formData();
        const name = form_data.get('name') as string;
        const amount = form_data.get('amount') as string;
        const is_expense = form_data.get('is_expense') as string;
        const wallet_id = form_data.get('wallet');

        const { error } = await supabase.from('charges').update({
            name,
            amount: parseInt(amount),
            is_expense: is_expense === 'on',
            wallet_id: wallet_id == "" ? null : wallet_id,
        }).eq('id', charge_id)

        if (error) {
            console.log(error)
            return fail(500, { error: 'Failed to update charge' });
        }

        redirect(303, '/app');
    }
}