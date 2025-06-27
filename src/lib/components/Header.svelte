<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';

	const { user } = $props();
</script>

<nav class="flex w-full items-center justify-between py-4">
	{#if user}
		<a href="/app"><Logo /></a>
		<div class="flex items-center space-x-4">
			<a href="/auth/logout">Logout</a>
		</div>
	{:else}
		<a href="/"><Logo /></a>
		<div class="flex items-center space-x-4">
			<a href="/auth/signup">Sign up</a>
			<a href="/auth/login">Login</a>
		</div>
	{/if}
</nav>
