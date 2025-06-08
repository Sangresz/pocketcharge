<script lang="ts">
	const { data } = $props();

	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, TrendingUp, TrendingDown } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import Modal from '$lib/components/ui/modal/modal.svelte';
	import AddWalletForm from '$lib/components/forms/add-wallet-form.svelte';
	import * as Icons from '$lib/assets/icons';

	let charges = data.charges;
	let wallets = data.wallets;
	let isAddWalletModalOpen = $state(false);

	function closeAddWalletModal() {
		isAddWalletModalOpen = false;
	}

	function formatCurrency(amount: number, currency = '$') {
		const currencyMap = {
			'$': 'USD',
			'£': 'GBP',
			'€': 'EUR'
		};
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currencyMap[currency as keyof typeof currencyMap] || 'USD'
		}).format(amount);
	}
</script>

{#snippet wallet_snippet(name: string, amount: number, icon: string, currency: string)}
	<div
		id="wallet"
		class="flex cursor-pointer items-center space-x-3 rounded-lg bg-white/5 p-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:shadow-md sm:p-4"
	>
		<img
			src={Icons[icon as keyof typeof Icons]}
			alt={name}
			class="text-primary h-6 w-6 sm:h-8 sm:w-8"
		/>
		<div class="flex flex-col">
			<div class="text-muted-foreground text-xs sm:text-sm">
				{name}
			</div>
			<div class="text-base font-bold sm:text-xl">
				{formatCurrency(amount, currency)}
			</div>
		</div>
	</div>
{/snippet}

<div
	class="mx-auto flex w-full flex-col space-y-4 px-2 sm:space-y-6 sm:px-4"
	style="max-width: min(100%, 1024px);"
>
	<h1 class="text-xl font-bold sm:text-2xl">My Wallets</h1>

	<div class="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
		{#each wallets as wallet}
			{@render wallet_snippet(wallet.name, wallet.balance, wallet.icon, wallet.currency)}
		{/each}
		<Button
			variant="outline"
			size="lg"
			class="hover:bg-primary hover:text-primary-foreground col-span-2 h-full min-h-[80px] transition-all duration-200 sm:min-h-[100px] md:col-span-1"
			onclick={() => (isAddWalletModalOpen = true)}
		>
			<Plus class="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
			<span class="text-sm sm:text-base">Add Wallet</span>
		</Button>
	</div>

	<div
		class="w-full rounded-lg border border-slate-700 bg-white/5 p-4 shadow-sm backdrop-blur-sm sm:p-6"
	>
		<h2 class="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">May 2024 Summary</h2>
		<div class="flex items-center justify-between sm:flex-row sm:space-y-0">
			<div class="flex items-center space-x-2 text-green-500">
				<TrendingUp class="h-4 w-4 sm:h-5 sm:w-5" />
				<span class="text-base font-medium sm:text-xl">+{formatCurrency(500)}</span>
			</div>
			<div class="flex items-center space-x-2 text-red-500">
				<TrendingDown class="h-4 w-4 sm:h-5 sm:w-5" />
				<span class="text-base font-medium sm:text-xl">-{formatCurrency(200)}</span>
			</div>
		</div>
	</div>

	<h2 class="mt-2 text-lg font-semibold sm:mt-4 sm:text-xl">Recent Transactions</h2>
	<div class="space-y-2 sm:space-y-3">
		{#each charges as charge}
			<div
				class="group overflow-hidden rounded-lg transition-all duration-200 hover:translate-x-2 hover:transform"
				transition:slide|local
			>
				<div
					class={`${charge.is_expense ? 'bg-red-500/10 hover:bg-red-500/20' : 'bg-green-500/10 hover:bg-green-500/20'} px-3 py-3 transition-colors duration-200 sm:px-6 sm:py-4`}
				>
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2 sm:space-x-3">
							{#if charge.is_expense}
								<TrendingDown class="h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
							{:else}
								<TrendingUp class="h-4 w-4 text-green-500 sm:h-5 sm:w-5" />
							{/if}
							<span class="text-sm font-medium sm:text-base">{charge.name}</span>
						</div>
						<div
							class={`text-base font-semibold sm:text-xl ${charge.is_expense ? 'text-red-500' : 'text-green-500'}`}
						>
							{charge.is_expense ? '-' : '+'}{formatCurrency(charge.amount)}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<Modal isOpen={isAddWalletModalOpen} title="Add New Wallet" onClose={closeAddWalletModal}>
	<AddWalletForm onSuccess={closeAddWalletModal} />
</Modal>
