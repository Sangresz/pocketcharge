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
            amount: parseFloat(amount),
            is_expense: is_expense === 'on',
            wallet_id: wallet_id == "" ? null : wallet_id,
            user_id: user?.id
        })

        if (error) {
            console.error(error)
            return fail(500, { error: 'Failed to create charge' });
        }

        const { data: wallet, error: queryingWalletError } = await supabase.from('wallets').select('*').eq('id', wallet_id).single();

        if (queryingWalletError) {
            console.error(queryingWalletError)
            return fail(500, { error: 'Failed to get wallet' });
        }

        const updateValue = is_expense === 'on' ? wallet.balance - parseFloat(amount) : wallet.balance + parseFloat(amount);

        const { error: updateWalletError } = await supabase.from('wallets').update({
            balance: updateValue
        }).eq('id', wallet_id)

        if (updateWalletError) {
            console.error(updateWalletError)
            return fail(500, { error: 'Failed to update wallet' });
        }

        redirect(303, '/app');
    },
    update: async ({ request, locals: { supabase } }) => {
        const charge_id = new URL(request.url).searchParams.get('charge_id');
        const form_data = await request.formData();
        const name = form_data.get('name') as string;
        const amount = parseFloat(form_data.get('amount') as string);
        const is_expense = form_data.get('is_expense') as string;
        const wallet_id = form_data.get('wallet');

        const { data: charge, error: queryingChargeError } = await supabase.from('charges').select('*').eq('id', charge_id).single();

        if (queryingChargeError) {
            console.error(queryingChargeError)
            return fail(500, { error: 'Failed to get charge' });
        }

        const { error: updateError } = await supabase.from('charges').update({
            name,
            amount: amount,
            is_expense: is_expense === 'on',
            wallet_id: wallet_id == "" ? null : wallet_id,
        }).eq('id', charge_id)

        if (updateError) {
            console.error(updateError)
            return fail(500, { error: 'Failed to update charge' });
        }

        if (charge.wallet_id != null) {
            const { data: beforeWallet, error: queryingBeforeWalletError } = await supabase.from('wallets').select('id, balance, name').eq('id', charge.wallet_id).single();

            if (queryingBeforeWalletError) {
                console.error(queryingBeforeWalletError)
                return fail(500, { error: 'Failed to get first wallet' });
            }

            const newBalance = beforeWallet.balance + (charge.is_expense ? charge.amount : -charge.amount);

            const { error: updateWalletError } = await supabase.from('wallets').update({
                balance: newBalance
            }).eq('id', charge.wallet_id)

            if (updateWalletError) {
                console.error(updateWalletError)
                return fail(500, { error: 'Failed to update first wallet' });
            }
        }

        if (wallet_id != "") {
            const { data: afterWallet, error: queryingAfterWalletError } = await supabase.from('wallets').select('id, balance, name').eq('id', wallet_id).single();

            if (queryingAfterWalletError) {
                console.error(queryingAfterWalletError)
                return fail(500, { error: 'Failed to get second wallet' });
            }

            const newBalance = is_expense === 'on' ? afterWallet.balance - amount : afterWallet.balance + amount;

            const { error: updateAfterWalletError } = await supabase.from('wallets').update({
                balance: newBalance
            }).eq('id', wallet_id)

            if (updateAfterWalletError) {
                console.error(updateAfterWalletError)
                return fail(500, { error: 'Failed to update second wallet' });
            }
        }

        redirect(303, '/app');
    }
}