<script>
	import Modal from '$lib/components/ui/modal/modal.svelte';
	import { getState } from '$lib/chargesModalState.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';

	let { children } = $props();
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
	<form method="POST" action="/app/charges/new?" class="flex flex-col space-y-4">
		<div class="flex flex-col space-y-2">
			<Label for="name">Name</Label>
			<Input type="text" name="name" required placeholder="Insert name" />
		</div>
		<div class="flex flex-col space-y-2">
			<Label for="amount">Amount</Label>
			<Input type="number" name="amount" required step="0.01" min="0" placeholder="0.00" />
		</div>
		<div class="flex flex-col space-y-2">
			<Label for="is_expanse">Is expense</Label>
			<input type="checkbox" name="is_expanse" value={true} class="self-start" />
		</div>
		<Button variant="outline" type="submit" class="self-end">Create</Button>
	</form>
</Modal>
