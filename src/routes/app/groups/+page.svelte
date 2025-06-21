<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Modal from '$lib/components/ui/modal/modal.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();

	let isModalOpen = $state(false);
	let newGroupName = $state('');

	const { groups } = $derived(data);

	function openModal() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		newGroupName = '';
	}
</script>

<div class="container mx-auto max-w-4xl p-4">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Groups</h1>
	</div>

	<div class="space-y-4">
		{#each groups as group}
			<div class="rounded-lg border p-4 transition-colors hover:bg-gray-50">
				<h3 class="font-medium">{group.name}</h3>
			</div>
		{/each}

		<button
			onclick={openModal}
			class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 text-gray-500 transition-colors hover:bg-gray-50"
		>
			<Plus class="h-5 w-5" />
			<span>Create New Group</span>
		</button>
	</div>

	<Modal isOpen={isModalOpen} title="Create New Group" onClose={closeModal}>
		<form method="POST">
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Name</Label>
					<Input id="name" name="name" bind:value={newGroupName} class="col-span-3" required />
				</div>
				<Button type="submit">Create Group</Button>
			</div>
		</form>
	</Modal>
</div>
