<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Icons from '$lib/assets/icons';

	const ICONS = [
		{ value: 'icon_wallet', label: 'Wallet' },
		{ value: 'icon_bank', label: 'Bank' },
		{ value: 'icon_credit_card', label: 'Credit Card' },
		{ value: 'icon_piggy', label: 'Piggy Bank' },
		{ value: 'icon_money_bag', label: 'Money Bag' },
		{ value: 'icon_investment', label: 'Investment' },
		{ value: 'icon_bitcoin', label: 'Bitcoin' },
		{ value: 'icon_safe', label: 'Safe' },
		{ value: 'icon_contactless_payment', label: 'Contactless' },
		{ value: 'icon_visa', label: 'Visa' }
	];

	const { selectedWallet } = $props();

	let selectedIconValue = $state(selectedWallet?.icon || ICONS[0].value);

	let action = $derived(
		selectedWallet ? `?/updateWallet&wallet_id=${selectedWallet.id}` : '?/createWallet'
	);
</script>

<form method="POST" {action} class="space-y-4">
	<div class="space-y-2">
		<label for="name" class="text-sm font-medium">Wallet Name</label>
		<input
			type="text"
			id="name"
			name="name"
			value={selectedWallet?.name}
			required
			class="border-border bg-background w-full rounded-md border px-3 py-2"
			placeholder="e.g., Cash, Bank, Credit Card"
		/>
	</div>

	<div class="space-y-2">
		<label for="icon" class="text-sm font-medium">Icon</label>
		<div class="flex items-center space-x-2">
			<img
				src={Icons[selectedIconValue as keyof typeof Icons]}
				alt={selectedIconValue}
				class="text-primary h-6 w-6 sm:h-8 sm:w-8"
			/>
			<select
				bind:value={selectedIconValue}
				id="icon"
				name="icon"
				required
				class="border-border bg-background w-full cursor-pointer rounded-md border px-3 py-2"
			>
				{#each ICONS as icon}
					<option value={icon.value}>{icon.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="space-y-2">
		<label for="balance" class="text-sm font-medium">Balance</label>
		<div class="relative">
			<span class="text-muted-foreground absolute top-2 left-3">€</span>
			<input
				type="number"
				id="balance"
				name="balance"
				required
				step="0.01"
				min="0"
				class="border-border bg-background w-full rounded-md border py-2 pr-3 pl-7"
				placeholder="0.00"
				value={selectedWallet?.balance}
			/>
		</div>
	</div>

	<div class="pt-4">
		<Button type="submit" class="w-full">{selectedWallet ? 'Update' : 'Create'}</Button>
	</div>
</form>
