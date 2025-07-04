import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const firstName = formData.get('firstName') as string
        const lastName = formData.get('lastName') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { error } = await supabase.auth.signUp({ email, password, options: { data: { firstName, lastName } } })

        if (error) {
            console.error(error)
            redirect(303, '/auth/error')
        }

        redirect(303, '/app')
    }
};
