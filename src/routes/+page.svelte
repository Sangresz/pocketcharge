<script lang="ts">
	const { data } = $props();

	let countries = data.countries;
</script>

{#each countries as country}
	<div>{country.name}</div>
{/each}
