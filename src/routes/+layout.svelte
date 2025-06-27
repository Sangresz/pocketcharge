<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import NavbarMobile from '$lib/components/NavbarMobile.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { user, session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="relative mx-4 mt-4 flex flex-col items-center lg:mx-16">
	<Header {user} />
	{@render children()}
	{#if user}
		<div class="fixed bottom-0 w-full">
			<NavbarMobile />
		</div>
	{/if}
</div>
