<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import NavbarMobile from '$lib/components/NavbarMobile.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	const { data, children } = $props();
	let { session, supabase, user } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {
					goto('/', { invalidateAll: true });
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="mx-4 lg:mx-16 mt-4">
	<Navbar {user} />
	{@render children()}
	<NavbarMobile />
</div>
