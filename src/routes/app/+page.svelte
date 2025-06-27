<script lang="ts">
	import { TrendingUp, TrendingDown } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { updateState } from '$lib/chargesModalState.svelte';
	import { onMount } from 'svelte';
	import { createCharts } from '$lib/createCharts.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	let { data } = $props();
	let { charges } = $derived(data);

	function formatDate(timestamp: string) {
		const date = new Date(timestamp);

		const options: Intl.DateTimeFormatOptions = {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric'
		};

		return date.toLocaleDateString('en-UK', options);
	}

	function formatCurrency(amount: number, currency = '€') {
		const currencyMap = {
			$: 'USD',
			'£': 'GBP',
			'€': 'EUR'
		};
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currencyMap[currency as keyof typeof currencyMap] || 'EUR'
		}).format(amount);
	}

	onMount(() => {
		createCharts(charges);
	});
</script>

<div
	class="w-full rounded-lg border border-slate-700 bg-white/5 p-4 shadow-sm backdrop-blur-sm sm:p-6"
>
	{#if charges.length === 0}
		<div class="text-center text-sm font-medium text-slate-500 sm:text-base">
			No charges yet.<br />Create a charge to start seeing statistics.
		</div>
	{:else}
		<Tabs.Root value="month">
			<Tabs.List>
				<Tabs.Trigger value="year">Last year</Tabs.Trigger>
				<Tabs.Trigger value="month">Last month</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="year">
				<h2 class="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">Last year</h2>
				<div class="relative max-h-64 w-full">
					<canvas id="last_year_charges_canvas"></canvas>
				</div>
			</Tabs.Content>
			<Tabs.Content value="month">
				<h2 class="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">
					{new Date().toLocaleDateString('en-UK', { month: 'long' })}
				</h2>
				<div class="relative max-h-64 w-full">
					<canvas id="last_month_charges_canvas"></canvas>
				</div>
			</Tabs.Content>
		</Tabs.Root>
	{/if}
</div>

<h2 class="mt-2 text-lg font-semibold sm:mt-4 sm:text-xl">Recent Transactions</h2>
<div class="mb-8 flex w-full flex-col space-y-2 sm:space-y-3">
	{#each charges as charge}
		<button
			onclick={() => updateState({ isModalOpen: true, selectedCharge: charge })}
			class="group cursor-pointer overflow-hidden rounded-lg transition-all duration-200 hover:translate-x-2 hover:transform"
			transition:slide|local
		>
			<div
				class={`${charge.is_expense ? 'bg-red-500/10 hover:bg-red-500/20' : 'bg-green-500/10 hover:bg-green-500/20'} px-3 py-3 transition-colors duration-200 sm:px-6 sm:py-4`}
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-2 sm:space-x-3">
						{#if charge.is_expense}
							<TrendingDown class="h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
						{:else}
							<TrendingUp class="h-4 w-4 text-green-500 sm:h-5 sm:w-5" />
						{/if}
						<span class="text-sm font-medium sm:text-base">{charge.name}</span>
						<span class="text-sm font-medium sm:text-base">{formatDate(charge.created_at)}</span>
						{#if charge.groups}
							<span class="font-bold italic">{charge.groups.name}</span>
						{/if}
					</div>
					<div
						class={`text-base font-semibold sm:text-xl ${charge.is_expense ? 'text-red-500' : 'text-green-500'}`}
					>
						{charge.is_expense ? '-' : '+'}{formatCurrency(charge.amount)}
					</div>
				</div>
			</div>
		</button>
	{/each}
</div>
