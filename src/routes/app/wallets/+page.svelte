<script lang="ts">
	import * as Icons from '$lib/assets/icons';
	import type { Tables } from '$lib/database.types.js';
	const { data } = $props();

	const { wallets } = $derived(data);
</script>

{#snippet wallet_snippet({ name, icon, currency, balance }: Tables<'wallets'>)}
	<div id="wallet" class="flex items-center space-x-2 rounded-sm border border-slate-600 p-2">
		<img src={Icons[icon as keyof typeof Icons]} class="h-6 w-6" alt={icon} />
		<div class="flex w-16 flex-col">
			<div class="text-sm">
				{name}
			</div>
			<div class="font-bold">
				{currency}
				{balance}
			</div>
		</div>
	</div>
{/snippet}

<div class="grid grid-cols-2 gap-4">
	{#each wallets as wallet}
		{@render wallet_snippet(wallet)}
	{/each}
</div>
