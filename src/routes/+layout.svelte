<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import NavbarMobile from '$lib/components/NavbarMobile.svelte';
	const { children } = $props();
</script>

<div class="mx-4 lg:mx-16 mt-4">
	<Navbar />
	{@render children()}
	<NavbarMobile />
</div>
