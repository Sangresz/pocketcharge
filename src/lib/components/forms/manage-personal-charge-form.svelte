<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Icons from '$lib/assets/icons';
	import type { Tables } from '$lib/database.types';

	const { selectedCharge, wallets } = $props();

	let selectedWalletId: string | null = $derived(
		selectedCharge != null ? selectedCharge.wallet_id : null
	);
	const selectedWallet = $derived(
		wallets.find((wallet: Tables<'wallets'>) => wallet.id === selectedWalletId)
	);
</script>

<form
	method="POST"
	action={selectedCharge == null
		? '/app/charges?/new'
		: `/app/charges?/update&charge_id=${selectedCharge.id}`}
	class="flex flex-col space-y-4"
>
	<div class="flex flex-col space-y-2">
		<Label for="name">Name</Label>
		<Input
			type="text"
			name="name"
			required
			value={selectedCharge && selectedCharge.name}
			placeholder="Insert name"
		/>
	</div>
	<div class="flex flex-col space-y-2">
		<Label for="amount">Amount</Label>
		<Input
			type="number"
			name="amount"
			required
			value={selectedCharge && selectedCharge.amount}
			step="0.01"
			min="0.01"
			placeholder="0.01"
		/>
	</div>
	<div class="flex items-center space-x-2">
		<input
			type="checkbox"
			name="is_expense"
			checked={selectedCharge ? selectedCharge.is_expense : true}
			class="h-5 w-5 self-start"
		/>
		<Label for="is_expense">Is expense</Label>
	</div>
	<div class="flex flex-col space-y-2">
		<label for="wallet" class="text-sm font-medium">From wallet</label>
		<div class="flex items-center space-x-2">
			{#if selectedWallet}
				<img
					src={Icons[selectedWallet.icon as keyof typeof Icons]}
					alt={selectedWallet.icon}
					class="text-primary h-6 w-6 sm:h-8 sm:w-8"
				/>
			{/if}
			<select
				name="wallet"
				bind:value={selectedWalletId}
				class="border-border bg-background w-full cursor-pointer rounded-md border px-3 py-2"
			>
				{#each [{ name: 'No wallet', id: null }, ...wallets] as wallet}
					<option value={wallet.id}>{wallet.name}</option>
				{/each}
			</select>
		</div>
	</div>
	<Button variant="outline" type="submit" class="self-end"
		>{selectedCharge == null ? 'Create' : 'Update'}</Button
	>
</form>
