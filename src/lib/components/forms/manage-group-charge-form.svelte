<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	const { selectedCharge } = $props();
</script>

<form
	method="POST"
	action={selectedCharge == null
		? '/app/charges?/new'
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
		<Label for="is_expanse">Is expense</Label>
	</div>
	<Button variant="outline" type="submit" class="self-end"
		>{selectedCharge == null ? 'Create' : 'Update'}</Button
	>
</form>
