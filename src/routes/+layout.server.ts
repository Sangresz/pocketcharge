import { client } from '$lib/pocketbase';

const records = await client.collection('users').getFullList({
	sort: '-created'
});

console.log('Records ', records);
