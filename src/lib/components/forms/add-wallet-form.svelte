<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Icons from '$lib/assets/icons';

	const CURRENCIES = [
		{ value: '$', label: 'USD - US Dollar'},
		{ value: '£', label: 'GBP - British Pound'},
		{ value: '€', label: 'EUR - Euro' }
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

	const { selectedWallet } = $props();

	let selectedIconValue = $state(selectedWallet?.icon || ICONS[0].value)
	let selectedCurrencyValue = $state(selectedWallet?.currency || CURRENCIES[0].value);

	let action = $derived(selectedWallet ? `?/updateWallet&wallet_id=${selectedWallet.id}` : '/app/createWallet');
</script>

<form
	method="POST"
	action={action}
	class="space-y-4"
>
	<div class="space-y-2">
		<label for="name" class="text-sm font-medium">Wallet Name</label>
		<input
			type="text"
			id="name"
			name="name"
			value={selectedWallet?.name}
			required
			class="w-full px-3 py-2 border border-border rounded-md bg-background"
			placeholder="e.g., Cash, Bank, Credit Card"
		/>
	</div>

	<div class="space-y-2">
		<label for="icon" class="text-sm font-medium">Icon</label>
		<div class="flex space-x-2 items-center">
			<img
				src={Icons[selectedIconValue as keyof typeof Icons]}
				alt={selectedIconValue}
				class="w-6 h-6 sm:w-8 sm:h-8 text-primary"
			/>
			<select
				bind:value={selectedIconValue}
				id="icon"
				name="icon"
				required
				class="w-full px-3 py-2 border border-border rounded-md bg-background cursor-pointer"
			>
				{#each ICONS as icon}
					<option value={icon.value}>{icon.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="space-y-2">
		<label for="currency" class="text-sm font-medium">Currency</label>
		<select
			id="currency"
			name="currency"
			required
			class="w-full px-3 py-2 border border-border rounded-md bg-background cursor-pointer"
			bind:value={selectedCurrencyValue}
		>
			{#each CURRENCIES as currency}
				<option value={currency.value}>{currency.label}</option>
			{/each}
		</select>
	</div>

	<div class="space-y-2">
		<label for="balance" class="text-sm font-medium">Balance</label>
		<div class="relative">
			<span class="absolute left-3 top-2 text-muted-foreground">{selectedCurrencyValue}</span>
			<input
				type="number"
				id="balance"
				name="balance"
				required
				step="0.01"
				min="0"
				class="w-full pl-7 pr-3 py-2 border border-border rounded-md bg-background"
				placeholder="0.00"
				value={selectedWallet?.balance}
			/>
		</div>
	</div>

	<div class="pt-4">
		<Button type="submit" class="w-full">{selectedWallet ? 'Update' : 'Create'}</Button>
	</div>
</form>
