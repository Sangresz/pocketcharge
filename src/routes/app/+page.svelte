<script lang="ts">
	const { data } = $props();

	import Button from '$lib/components/ui/button/button.svelte';
	import { Wallet, Plus } from 'lucide-svelte';

	let charges = data.charges;
</script>

{#snippet wallet(name, amount, IconComponent)}
	<div id="wallet" class="flex items-center space-x-2 border border-slate-600 p-2 rounded-sm">
		<IconComponent class="w-6 h-6" />
		<div class="flex flex-col w-16">
			<div class="text-sm">
				{name}
			</div>
			<div class="font-bold">
				{amount}
			</div>
		</div>
	</div>
{/snippet}

<div class="flex flex-col space-y-4">
	<div id="wallets" class="flex space-x-2 overflow-x-scroll border border-green-400 p-2 items-center">
		{@render wallet("Cash", "$1000", Wallet)}
		{@render wallet("Bank", "$2000", Wallet)}
		{@render wallet("Credit", "$3000", Wallet)}
		{@render wallet("Savings", "$4000", Wallet)}
		<Button variant="outline" size="icon">
			<Plus class="h-4 w-4" />
		</Button>
	</div>
	<div class="w-full border border-black rounded-md p-2">
		<div>
			May 2024:
		</div>
		<div class="flex items-center justify-center">
			<div class="flex space-x-2 items-center">
				<div class="text-green-600">
					+500
				</div>
				<div class="text-2xl">
					300
				</div>
				<div class="text-red-600">
					-200
				</div>
			</div>
		</div>
	</div>
	{#each charges as charge}
		<div class={`${charge.is_expense?"bg-red-300":"bg-green-300"} px-4 py-2 text-xl rounded-md`}>
			<div class="flex space-x-2">
				<div>
					{charge.name}
				</div>
				<div>
					{charge.amount}
				</div>
			</div>
		</div>
	{/each}
</div>
