// import { redirect } from '@sveltejs/kit';
// import { ClientResponseError } from 'pocketbase';
// import type { Actions } from './$types';

// export const actions: Actions = {
// 	default: async ({ request, locals }) => {
//     const body = Object.fromEntries(await request.formData());

//     try {
//       await locals.pb.collection('users').authWithPassword(body.email, body.password);
//       return redirect(303, '/app');
//     } catch (error) {
//       if (error instanceof ClientResponseError) {
//         return {error: error.response.message};
//       } else {
//         console.error(error);
//         return redirect(303, '/auth/error');
//       }
//     }
// 	}
// };
