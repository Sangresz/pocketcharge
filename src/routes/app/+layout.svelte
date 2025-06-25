<script lang="ts">
	import Modal from '$lib/components/ui/modal/modal.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { chargeState, toggleModal } from '$lib/chargesModalState.svelte';
	import ManagePersonalChargeForm from '$lib/components/forms/manage-personal-charge-form.svelte';
	import ManageGroupChargeForm from '$lib/components/forms/manage-group-charge-form.svelte';

	let { data, children } = $props();

	const { wallets } = $derived(data);
</script>

<div class="mx-auto flex w-full flex-col space-y-4 sm:space-y-6 sm:px-4 lg:px-64 lg:pt-4">
	{@render children()}
</div>

<Modal
	title={chargeState.selectedCharge == null ? 'Create new charge' : 'Update charge'}
	isOpen={chargeState.isModalOpen}
	onClose={toggleModal}
>
	<Tabs.Root value="personal">
		<Tabs.List>
			<Tabs.Trigger value="personal">Personal</Tabs.Trigger>
			<Tabs.Trigger value="group">Group</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="personal">
			<ManagePersonalChargeForm selectedCharge={chargeState.selectedCharge} {wallets} />
		</Tabs.Content>
		<Tabs.Content value="group">
			<ManageGroupChargeForm selectedCharge={chargeState.selectedCharge} />
		</Tabs.Content>
	</Tabs.Root>
</Modal>
