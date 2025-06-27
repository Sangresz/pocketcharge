<script lang="ts">
	import Modal from '$lib/components/ui/modal/modal.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { chargeState, toggleModal } from '$lib/chargesModalState.svelte';
	import ManagePersonalChargeForm from '$lib/components/forms/manage-personal-charge-form.svelte';
	import ManageGroupChargeForm from '$lib/components/forms/manage-group-charge-form.svelte';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	const { wallets, groups, supabase, user } = $derived(data);

	let activeTab = $derived(chargeState.selectedCharge?.groups ? 'group' : 'personal');

	onMount(() => {
		Notification.requestPermission().then((result) => {
			if (result !== 'granted') {
				console.log('Permission denied');
				return;
			}

			try {
				supabase
					.channel('member-charges-insert-channel')
					.on(
						'postgres_changes',
						{ event: 'INSERT', schema: 'public', table: 'charges' },
						(payload) => {
							const charge = payload.new;
							if (charge.user_id !== user?.id && charge.group_id !== null) {
								const group = groups.find((g) => g.id === charge.group_id);
								const member_group = group.member_groups.find(
									(mg: any) => mg.user_id === charge.user_id
								);

								const text = `${member_group.name} added ${charge.name} for ${charge.amount} to ${group.name}`;
								new Notification('New charge shared with you!', { body: text });
								navigator.serviceWorker.ready.then((registration) => {
									registration.showNotification('New charge shared with you!', {
										body: text
									});
								});
							}
						}
					)
					.subscribe();
			} catch (error) {
				console.error('Error subscribing to channel:', error);
			}
		});
	});
</script>

<div class="mx-auto flex w-full flex-col space-y-4 sm:space-y-6 sm:px-4 lg:px-64 lg:pt-4">
	{@render children()}
</div>

<Modal
	title={chargeState.selectedCharge == null ? 'Create new charge' : 'Update charge'}
	isOpen={chargeState.isModalOpen}
	onClose={toggleModal}
>
	<Tabs.Root value={activeTab}>
		{#if chargeState.selectedCharge == null}
			<Tabs.List>
				<Tabs.Trigger value="personal">Personal</Tabs.Trigger>
				<Tabs.Trigger value="group">Group</Tabs.Trigger>
			</Tabs.List>
		{/if}
		<Tabs.Content value="personal">
			<ManagePersonalChargeForm selectedCharge={chargeState.selectedCharge} {wallets} />
		</Tabs.Content>
		<Tabs.Content value="group">
			<ManageGroupChargeForm selectedCharge={chargeState.selectedCharge} {groups} {wallets} />
		</Tabs.Content>
	</Tabs.Root>
</Modal>
