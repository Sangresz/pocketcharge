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
	<div id="wallet" class="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
		<img
			src={Icons[icon as keyof typeof Icons]}
			alt={name}
			class="w-6 h-6 sm:w-8 sm:h-8 text-primary"
		/>
		<div class="flex flex-col">
			<div class="text-xs sm:text-sm text-muted-foreground">
				{name}
			</div>
			<div class="font-bold text-base sm:text-xl">
				{formatCurrency(amount, currency)}
			</div>
		</div>
	</div>
{/snippet}

<div class="flex flex-col space-y-4 sm:space-y-6 w-full px-2 sm:px-4 mx-auto" style="max-width: min(100%, 1024px);">
	<h1 class="text-xl sm:text-2xl font-bold">My Wallets</h1>
	
	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
		{#each wallets as wallet}
			{@render wallet_snippet(wallet.name, wallet.balance, wallet.icon, wallet.currency)}
		{/each}
		<Button 
			variant="outline" 
			size="lg" 
			class="h-full min-h-[80px] sm:min-h-[100px] col-span-2 md:col-span-1 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
			onclick={() => isAddWalletModalOpen = true}
		>
			<Plus class="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
			<span class="text-sm sm:text-base">Add Wallet</span>
		</Button>
	</div>

	<div class="w-full bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-sm border border-slate-700">
		<h2 class="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">May 2024 Summary</h2>
		<div class="flex sm:flex-row items-center justify-between sm:space-y-0">
			<div class="flex items-center space-x-2 text-green-500">
				<TrendingUp class="w-4 h-4 sm:w-5 sm:h-5" />
				<span class="text-base sm:text-xl font-medium">+{formatCurrency(500)}</span>
			</div>
			<div class="flex items-center space-x-2 text-red-500">
				<TrendingDown class="w-4 h-4 sm:w-5 sm:h-5" />
				<span class="text-base sm:text-xl font-medium">-{formatCurrency(200)}</span>
			</div>
		</div>
	</div>

	<h2 class="text-lg sm:text-xl font-semibold mt-2 sm:mt-4">Recent Transactions</h2>
	<div class="space-y-2 sm:space-y-3">
		{#each charges as charge}
			<div 
				class="group rounded-lg overflow-hidden transition-all duration-200 hover:transform hover:translate-x-2"
				transition:slide|local
			>
				<div class={`${charge.is_expense ? "bg-red-500/10 hover:bg-red-500/20" : "bg-green-500/10 hover:bg-green-500/20"} px-3 sm:px-6 py-3 sm:py-4 transition-colors duration-200`}>
					<div class="flex justify-between items-center">
						<div class="flex items-center space-x-2 sm:space-x-3">
							{#if charge.is_expense}
								<TrendingDown class="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
							{:else}
								<TrendingUp class="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
							{/if}
							<span class="font-medium text-sm sm:text-base">{charge.name}</span>
						</div>
						<div class={`text-base sm:text-xl font-semibold ${charge.is_expense ? "text-red-500" : "text-green-500"}`}>
							{charge.is_expense ? '-' : '+'}{formatCurrency(charge.amount)}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<Modal
	isOpen={isAddWalletModalOpen}
	title="Add New Wallet"
	onClose={closeAddWalletModal}
>
	<AddWalletForm onSuccess={closeAddWalletModal} />
</Modal>
