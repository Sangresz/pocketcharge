<script lang="ts">
	import Modal from '$lib/components/ui/modal/modal.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Icons from '$lib/assets/icons';
	import { getState } from '$lib/chargesModalState.svelte';

	let { data, children } = $props();

	const { wallets } = $derived(data);
	let selectedWalletId: string | null = $state(null);
	const selectedWallet = $derived(wallets.find((wallet) => wallet.id === selectedWalletId));

	const manageState = getState();
</script>

<div class="mx-auto flex w-full flex-col space-y-4 sm:space-y-6 sm:px-4 lg:px-64 lg:pt-4">
	{@render children()}
</div>

<Modal
	title="Create new charge"
	isOpen={manageState.state.isModalOpen}
	onClose={manageState.toggleModal}
>
	<Tabs.Root value="personal">
		<Tabs.List>
			<Tabs.Trigger value="personal">Personal</Tabs.Trigger>
			<Tabs.Trigger value="group">Group</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="personal">
			<form method="POST" action="/app/charges/new?" class="flex flex-col space-y-4">
				<div class="flex flex-col space-y-2">
					<Label for="name">Name</Label>
					<Input type="text" name="name" required placeholder="Insert name" />
				</div>
				<div class="flex flex-col space-y-2">
					<Label for="amount">Amount</Label>
					<Input type="number" name="amount" required step="0.01" min="0.01" placeholder="0.01" />
				</div>
				<div class="flex items-center space-x-2">
					<input type="checkbox" name="is_expense" checked class="h-5 w-5 self-start" />
					<Label for="is_expanse">Is expense</Label>
				</div>
				<div class="space-y-2">
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
				<Button variant="outline" type="submit" class="self-end">Create</Button>
			</form>
		</Tabs.Content>
		<Tabs.Content value="group">Manage the group expense.</Tabs.Content>
	</Tabs.Root>
</Modal>
