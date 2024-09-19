<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Button from './ui/button/button.svelte';

	const { user } = $props();
</script>

<nav class="flex items-center justify-between py-4">
	<Logo />
	{#if !user}
		<div class="flex items-center space-x-4">
			<Button href="/auth/signup">Sign up</Button>
			<Button href="/auth/login">Login</Button>
		</div>
	{:else}
		<Button href="/auth/logout">Logout</Button>
	{/if}
</nav>
