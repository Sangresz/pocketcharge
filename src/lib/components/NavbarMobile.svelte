<script lang="ts">
	import { Wallet, Home, Plus, Users } from 'lucide-svelte';
	import { updateState } from '$lib/chargesModalState.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="flex w-full justify-center space-x-2 bg-zinc-50 p-4">
	<a
		href="/app/wallets"
		class="flex h-16 w-16 flex-col items-center rounded-full border border-slate-300 p-2"
	>
		<span class="text-sm">Wallet</span>
		<Wallet class="h-8 w-8" />
	</a>
	<a
		href="/app"
		class="flex h-16 w-16 flex-col items-center rounded-full border border-slate-300 p-2"
	>
		<span class="text-sm">Home</span>
		<Home class="h-8 w-8" />
	</a>
	<Button
		onclick={() => updateState({ isModalOpen: true, selectedCharge: null })}
		class="flex h-16 w-16 flex-col items-center rounded-full border border-slate-300 p-2"
	>
		<span class="text-sm">New</span>
		<Plus class="h-8 w-8" />
	</Button>
	<a
		href="/app/groups"
		class="flex h-16 w-16 flex-col items-center rounded-full border border-slate-300 p-2"
	>
		<span class="text-sm">Groups</span>
		<Users class="h-8 w-8" />
	</a>
</div>
