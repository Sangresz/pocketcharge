import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { pb } }) => {
	const response = await pb.collection('charges').getList(1, 10,{
    sort: '-created',
	});

	return { charges: response.items ?? [] };
};
