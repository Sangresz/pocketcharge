<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus } from 'lucide-svelte';
	import Modal from '$lib/components/ui/modal/modal.svelte';
	import AddWalletForm from '$lib/components/forms/add-wallet-form.svelte';
	import * as Icons from '$lib/assets/icons';
	import type { Tables } from '$lib/database.types';

	const { data } = $props();
	const { wallets } = $derived(data);

	let isAddWalletModalOpen = $state(false);
	let selectedWallet = $state<Tables<'wallets'> | undefined>(undefined);

	function closeAddWalletModal() {
		isAddWalletModalOpen = false;
	}

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR'
		}).format(amount);
	}
</script>

{#snippet wallet_snippet(wallet: Tables<'wallets'>)}
	<button
		id="wallet"
		class="flex cursor-pointer items-center space-x-3 rounded-lg bg-white/5 p-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:shadow-md sm:p-4"
		onclick={() => ((selectedWallet = wallet), (isAddWalletModalOpen = true))}
	>
		<img
			src={Icons[wallet.icon as keyof typeof Icons]}
			alt={wallet.name}
			class="text-primary h-6 w-6 sm:h-8 sm:w-8"
		/>
		<div class="flex flex-col">
			<div class="text-muted-foreground text-xs sm:text-sm">
				{wallet.name}
			</div>
			<div class="text-base font-bold sm:text-xl">
				{formatCurrency(wallet.balance)}
			</div>
		</div>
	</button>
{/snippet}

<h1 class="text-xl font-bold sm:text-2xl">My Wallets</h1>

<div class="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
	{#each wallets as wallet}
		{@render wallet_snippet(wallet)}
	{/each}
	<Button
		variant="outline"
		size="lg"
		class="hover:bg-primary hover:text-primary-foreground col-span-2 h-full min-h-[80px] cursor-pointer transition-all duration-200 sm:min-h-[100px] md:col-span-1"
		onclick={() => ((selectedWallet = undefined), (isAddWalletModalOpen = true))}
	>
		<Plus class="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
		<span class="text-sm sm:text-base">Add Wallet</span>
	</Button>
</div>

<Modal
	isOpen={isAddWalletModalOpen}
	title={selectedWallet ? 'Update Wallet' : 'Add New Wallet'}
	onClose={closeAddWalletModal}
>
	<AddWalletForm {selectedWallet} />
</Modal>
