<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { X } from 'lucide-svelte';

	let modal: HTMLDivElement | undefined= $state();

	let { isOpen = false, title, onClose, children} = $props();
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div
		bind:this={modal}
		class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
		onclick={(e) => { if (e.target === modal) onClose() }}
		transition:fade={{ duration: 200 }}
	>
		<div
			class="bg-background border border-border rounded-lg shadow-lg w-full max-w-lg"
			transition:scale={{ duration: 200, start: 0.95 }}
		>
			<div class="flex justify-between items-center p-4 border-b border-border">
				<h2 class="text-lg font-semibold">{title}</h2>
				<button
					onclick={onClose}
					class="text-muted-foreground hover:text-foreground transition-colors"
				>
					<X class="w-5 h-5" />
				</button>
			</div>
			<div class="p-4">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
