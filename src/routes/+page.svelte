<script lang="ts">
	const { data } = $props();

	let charges = data.charges;
</script>

<div class="flex flex-col space-y-4">
	{#each charges as charge}
		<div class={`${charge.is_expense?"bg-red-300":"bg-green-300"} px-4 py-2 text-xl rounded-md`}>
			<div class="flex space-x-2">
				<div>
					{charge.title}
				</div>
				<div>
					{charge.amount}
				</div>
			</div>
		</div>
	{/each}
</div>
