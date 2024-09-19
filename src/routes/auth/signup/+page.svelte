<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="flex items-center justify-center">
	<form method="POST" class="p-12 bg-zinc-100 flex flex-col space-y-6">
		<div class="w-full max-w-md flex flex-col space-y-3">
			<label for="inputEmail">Email</label>
			<input
				id="inputEmail"
				name="email"
				type="email"
				autocomplete="email"
				class="border border-zinc-100 py-2 px-4"
			/>
		</div>
		<div class="w-full max-w-md flex flex-col space-y-3">
			<label for="inputPassword">Password</label>
			<input
				id="inputPassword"
				name="password"
				type="password"
				class="border border-zinc-100 py-2 px-4"
			/>
		</div>
		<div class="w-full max-w-md flex flex-col space-y-3">
			<label for="inputPasswordConfirm">Password Confirm</label>
			<input
				id="inputPasswordConfirm"
				name="passwordConfirm"
				type="password"
				class="border border-zinc-100 py-2 px-4"
			/>
		</div>
		<Button type="submit">Sign up</Button>
	</form>
</div>
