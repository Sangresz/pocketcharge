<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Tables } from '$lib/database.types';

	const { selectedCharge, groups } = $props();

	let selectedGroupId: string | null = $derived(
		selectedCharge != null ? selectedCharge.group_id : groups[0]?.id
	);
	const selectedGroup = $derived(
		groups.find((group: Tables<'groups'>) => group.id === selectedGroupId)
	);
</script>

<form
	method="POST"
	action={selectedCharge == null
		? '/app/charges?/newGroup'
		: `/app/charges?/update&charge_id=${selectedCharge.id}`}
	class="flex flex-col space-y-4"
>
	<div class="flex flex-col space-y-2">
		<Label for="name">Name</Label>
		<Input
			type="text"
			name="name"
			required
			value={selectedCharge && selectedCharge.name}
			placeholder="Insert name"
		/>
	</div>
	<div class="flex flex-col space-y-2">
		<Label for="amount">Amount</Label>
		<Input
			type="number"
			name="amount"
			required
			value={selectedCharge && selectedCharge.amount}
			step="0.01"
			min="0.01"
			placeholder="0.01"
		/>
	</div>
	<div class="flex items-center space-x-2">
		<input
			type="checkbox"
			name="is_expense"
			checked={selectedCharge ? selectedCharge.is_expense : true}
			class="h-5 w-5 self-start"
		/>
		<Label for="is_expense">Is expense</Label>
	</div>
	<div class="flex flex-col space-y-2">
		<label for="group" class="text-sm font-medium">Group</label>
		<div class="flex items-center space-x-2">
			<select
				name="group"
				class="border-border bg-background w-full cursor-pointer rounded-md border px-3 py-2"
			>
				{#each groups as group}
					<option value={group.id}>{group.name}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="flex flex-col space-y-2">
		<span>Splitted between</span>
		{#each selectedGroup?.member_groups as member}
			<div class="flex items-center space-x-2">
				<input
					type="checkbox"
					name="member"
					value={member.id}
					checked={true}
					class="h-4 w-4 self-start"
				/>
				<Label for="member">{member.name}</Label>
			</div>
		{/each}
	</div>
	<Button variant="outline" type="submit" class="self-end"
		>{selectedCharge == null ? 'Create' : 'Update'}</Button
	>
</form>
