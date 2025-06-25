<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
</script>

<div class="mt-12 flex flex-col items-center">
	<form method="POST" class="flex w-96 flex-col space-y-6 bg-zinc-100 p-12">
		<h2 class="text-3xl">Sign Up</h2>
		<div class="flex w-full max-w-lg flex-col space-y-3">
			<Label for="email">Email</Label>
			<Input name="email" type="email" autocomplete="email" required />
		</div>
		<div class="flex w-full max-w-lg flex-col space-y-3">
			<Label for="firstName">First Name</Label>
			<Input name="firstName" type="text" required />
		</div>
		<div class="flex w-full max-w-lg flex-col space-y-3">
			<Label for="lastName">Last Name</Label>
			<Input name="lastName" type="text" required />
		</div>
		<div class="flex w-full max-w-lg flex-col space-y-3">
			<Label for="inputPassword">Password</Label>
			<Input id="inputPassword" name="password" type="password" required />
		</div>
		<Button type="submit">Sign up</Button>
	</form>
</div>
