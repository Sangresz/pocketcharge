<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	const { form } = $props();
</script>

<div class="flex items-center flex-col mt-12">
	<form method="POST" class="p-12 w-96 bg-zinc-100 flex flex-col space-y-6">
		<h2 class="text-3xl">Sign Up</h2>
		<div class="w-full max-w-lg flex flex-col space-y-3">
			<Label for="email">Email</Label>
			<Input id="email" name="email" type="email" autocomplete="email" />
		</div>
		<div class="w-full max-w-lg flex flex-col space-y-3">
			<Label for="password">Password</Label>
			<Input id="password" name="password" type="password" />
		</div>
		{#if form?.error}
			<p class="text-red-500">{form.error}</p>
		{/if}
		<Button type="submit">Sign up</Button>
	</form>
</div>
