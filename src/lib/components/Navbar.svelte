<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import Button from './ui/button/button.svelte';
</script>

<nav class="flex items-center justify-between py-4">
	<Logo />
	<Button href="/auth/">Login</Button>
</nav>
