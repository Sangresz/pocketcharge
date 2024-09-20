<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
</script>

<div class="flex items-center flex-col mt-12">
	<form method="POST" class="p-12 w-96 bg-zinc-100 flex flex-col space-y-6">
		<h2 class="text-3xl">Sign Up</h2>
		<div class="w-full max-w-lg flex flex-col space-y-3">
			<Label for="inputEmail">Email</Label>
			<Input id="inputEmail" name="email" type="email" autocomplete="email" />
		</div>
		<div class="w-full max-w-lg flex flex-col space-y-3">
			<Label for="inputPassword">Password</Label>
			<Input id="inputPassword" name="password" type="password" />
		</div>
		<div class="w-full max-w-lg flex flex-col space-y-3">
			<Label for="inputPasswordConfirm">Confirm Password</Label>
			<Input id="inputPasswordConfirm" name="passwordConfirm" type="password" />
		</div>
		<Button type="submit">Sign up</Button>
	</form>
</div>
