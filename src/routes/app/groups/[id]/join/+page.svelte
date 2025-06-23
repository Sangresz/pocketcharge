<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	const { data } = $props();

	const { member_groups, group_name } = $derived(data);
</script>

<div>
	<h1 class="text-2xl">Join Group {group_name}</h1>
	<form method="post" class="mt-12">
		<div class="space-y-2">
			<Label for="member" class="text-sm font-medium">Select who you are</Label>
			<select
				id="member"
				name="member"
				required
				class="border-border bg-background w-full cursor-pointer rounded-md border px-3 py-2"
			>
				{#each member_groups as member}
					<option value={member.id}>{member.name}</option>
				{/each}
			</select>
		</div>
		<Button variant="outline" type="submit" class="mt-4">Join</Button>
	</form>
</div>
