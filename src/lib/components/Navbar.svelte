<script lang="ts">
	import type RecordModel from 'pocketbase';
	import Logo from '$lib/components/Logo.svelte';
	import Button from './ui/button/button.svelte';

	const { user } = $props<{user: RecordModel}>();
</script>

<nav class="flex items-center justify-between py-4">
	{#if !user}
		<a href="/"><Logo /></a>
		<div class="flex items-center space-x-4">
			<Button href="/auth/signup">Sign up</Button>
			<Button href="/auth/login">Login</Button>
		</div>
		{:else}
		<a href="/app"><Logo /></a>
		<div class="flex items-center space-x-4">
			<span>{user.email}</span>
			<Button href="/auth/logout">Logout</Button>
		</div>
	{/if}
</nav>
