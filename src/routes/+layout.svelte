<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import NavbarMobile from '$lib/components/NavbarMobile.svelte';
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'

  let { data, children } = $props()
  let { session, supabase } = $derived(data)

	onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

<div class="mx-4 lg:mx-16 mt-4">
	<Navbar user={data.user} />
	{@render children()}
	{#if data.user}
		<NavbarMobile />
	{/if}
</div>
