/**
 * This file is necessary to ensure protection of all routes in the `private`
 * directory. It makes the routes in this directory _dynamic_ routes, which
 * send a server request, and thus trigger `hooks.server.ts`.
 **/

import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
    const { data: wallets, error } = await supabase.from('wallets').select('*').order('created_at');

    if (error) {
        console.log(error);
        return {
            wallets: []
        }
    }

    return {
        wallets: wallets ?? []
    }
}