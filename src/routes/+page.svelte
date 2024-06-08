<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";

  const { data } = $props();

  let countries = data.countries;
</script>

<Navbar />

{#each countries as country}
  <div>{country.name}</div>
{/each}