<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Modal from '$lib/components/ui/modal/modal.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Pen, Plus } from 'lucide-svelte';
	import type { Tables } from '$lib/database.types';

	let { data } = $props();

	const { groups } = $derived(data);

	let isModalOpen = $state(false);
	let selectedGroup = $state<Tables<'groups'> | undefined>(undefined);

	function openModal() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}
</script>

<h1 class="text-2xl font-bold">Groups</h1>

<div class="space-y-4">
	{#each groups as group}
		<div class="flex items-center space-x-2">
			<Button
				variant="outline"
				href={`/app/groups/${group.id}`}
				size="xl"
				class="w-full rounded-lg border p-4 transition-colors hover:bg-gray-50"
			>
				<h3 class="font-medium">{group.name}</h3>
			</Button>
			<button
				onclick={() => {
					selectedGroup = group;
					openModal();
				}}
				class="mx-2 cursor-pointer"
			>
				<Pen class="h-5 w-5" />
			</button>
		</div>
	{/each}

	<Button
		size="xl"
		variant="outline"
		onclick={openModal}
		class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 text-gray-500 transition-colors hover:bg-gray-50"
	>
		<Plus class="h-5 w-5" />
		<span>Create New Group</span>
	</Button>
</div>

<Modal
	isOpen={isModalOpen}
	title={selectedGroup ? 'Update Group' : 'Create New Group'}
	onClose={closeModal}
>
	<form
		method="POST"
		action={selectedGroup ? `?/updateGroup&group_id=${selectedGroup.id}` : '?/createGroup'}
	>
		<div class="grid gap-4 py-4">
			<div class="space-y-2">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" name="name" value={selectedGroup?.name} class="col-span-3" required />
			</div>
			<Button type="submit">{selectedGroup ? 'Update' : 'Create'}</Button>
		</div>
	</form>
</Modal>
