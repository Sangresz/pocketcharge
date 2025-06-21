<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	const CURRENCIES = [
		{ value: '$', label: 'USD - US Dollar', symbol: '$' },
		{ value: '£', label: 'GBP - British Pound', symbol: '£' },
		{ value: '€', label: 'EUR - Euro', symbol: '€' }
	];

	const ICONS = [
		{ value: 'icon_wallet', label: 'Wallet' },
		{ value: 'icon_bank', label: 'Bank' },
		{ value: 'icon_credit_card', label: 'Credit Card' },
		{ value: 'icon_piggy', label: 'Piggy Bank' },
		{ value: 'icon_money_bag', label: 'Money Bag' },
		{ value: 'icon_investment', label: 'Investment' },
		{ value: 'icon_bitcoin', label: 'Bitcoin' },
		{ value: 'icon_safe', label: 'Safe' },
		{ value: 'icon_gift_box', label: 'Gift' },
		{ value: 'icon_contactless_payment', label: 'Contactless' },
		{ value: 'icon_visa', label: 'Visa' }
	];

	let selectedCurrency = $state(CURRENCIES[0]);
</script>

<form
	method="POST"
	action="?/createWallet"
	class="space-y-4"
>
	<div class="space-y-2">
		<label for="name" class="text-sm font-medium">Wallet Name</label>
		<input
			type="text"
			id="name"
			name="name"
			required
			class="w-full px-3 py-2 border border-border rounded-md bg-background"
			placeholder="e.g., Cash, Bank, Credit Card"
		/>
	</div>

	<div class="space-y-2">
		<label for="icon" class="text-sm font-medium">Icon</label>
		<select
			id="icon"
			name="icon"
			required
			class="w-full px-3 py-2 border border-border rounded-md bg-background"
		>
			{#each ICONS as icon}
				<option value={icon.value}>{icon.label}</option>
			{/each}
		</select>
	</div>

	<div class="space-y-2">
		<label for="currency" class="text-sm font-medium">Currency</label>
		<select
			id="currency"
			name="currency"
			required
			class="w-full px-3 py-2 border border-border rounded-md bg-background"
			bind:value={selectedCurrency.value}
		>
			{#each CURRENCIES as currency}
				<option value={currency.value}>{currency.label}</option>
			{/each}
		</select>
	</div>

	<div class="space-y-2">
		<label for="balance" class="text-sm font-medium">Initial Balance</label>
		<div class="relative">
			<span class="absolute left-3 top-2 text-muted-foreground">{selectedCurrency.symbol}</span>
			<input
				type="number"
				id="balance"
				name="balance"
				required
				step="0.01"
				min="0"
				class="w-full pl-7 pr-3 py-2 border border-border rounded-md bg-background"
				placeholder="0.00"
			/>
		</div>
	</div>

	<div class="pt-4">
		<Button type="submit" class="w-full">Create Wallet</Button>
	</div>
</form>
