<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Button from './ui/button/button.svelte';

	const { user } = $props();
</script>

{#if !user}
<nav class="flex items-center justify-between py-4">
	<Logo />
	<Button href="/auth/">Login</Button>
</nav>
{/if}
