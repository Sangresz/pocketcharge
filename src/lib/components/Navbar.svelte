<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Button from './ui/button/button.svelte';

	const { user } = $props();
</script>

<nav class="flex items-center justify-between py-4">
	<Logo />
	<div class="flex items-center space-x-2">
		{#if user}
			<Button href="/auth/logout">Logout</Button>
		{:else}
			<Button href="/auth/">Login</Button>
		{/if}
	</div>
</nav>
