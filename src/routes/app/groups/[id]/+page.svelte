<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Modal from '$lib/components/ui/modal/modal.svelte';
	import type { Tables } from '$lib/database.types';
	import { Check, Plus, X } from 'lucide-svelte';

	const { data } = $props();

	const { user } = $derived(data);

	const { group } = $derived(data);

	let isModalOpen = $state(false);
	let isInviteIconShown = $state(false);
	let guests = $state(['']);

	function openModal() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}

	function addGuest() {
		guests = [...guests, ''];
	}

	function removeGuest(index: number) {
		guests = guests.filter((_, i) => i !== index);
	}

	function handleCopy() {
		navigator.clipboard.writeText(window.location.href + '/join?group_name=' + group.name);
		isInviteIconShown = true;
		setTimeout(() => {
			isInviteIconShown = false;
		}, 1000);
	}

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
</script>

<div class="flex flex-col space-y-4">
	<div class="flex justify-between">
		<h1 class="text-2xl font-bold">{group.name}</h1>
		<div class="flex space-x-2">
			<Button variant="outline" onclick={() => handleCopy()} class="flex space-x-2">
				{#if isInviteIconShown}
					<Check class="h-6 w-6" color="green" />
				{/if}
				<span>Copy invite link</span>
			</Button>
			<Button variant="outline" onclick={() => openModal()}>Add people to group</Button>
		</div>
	</div>
	<div class="flex flex-col">
		<h1 class="text-xl font-bold">Members</h1>
		<ul class="list-inside list-disc">
			{#each group.member_groups as member}
				<li class={`${member.user_id == user?.id ? 'italic underline' : ''} text-lg`}>
					{member.name}
					{#if member.user_id == user?.id}
						<span class="text-xs">(you)</span>
					{:else if member.balance == 0}
						<span>You are event</span>
					{:else if member.balance < 0}
						<span>You are in debit of {formatCurrency(member.balance * -1)}</span>
					{:else}
						<span>You are in credit of {formatCurrency(member.balance)}</span>
					{/if}
				</li>
			{/each}
		</ul>
		<div class="my-8 flex w-full flex-col space-y-2 sm:space-y-3">
			{#each group.charges as charge}
				<button class="group cursor-pointer overflow-hidden rounded-lg">
					<div
						class={`bg-red-500/10 px-3 py-3 transition-colors duration-200 hover:bg-red-500/20 sm:px-6 sm:py-4`}
					>
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-2 sm:space-x-3">
								<span class="text-sm font-medium sm:text-base">{charge.name}</span>
								<span class="text-sm font-medium sm:text-base">{formatDate(charge.created_at)}</span
								>
							</div>
							<div class={`text-base font-semibold text-red-500 sm:text-xl`}>
								{formatCurrency(charge.amount)}
							</div>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>

<Modal title="Invite people to the group" onClose={closeModal} isOpen={isModalOpen}>
	<form method="POST" action={`?/addPeople&group_id=${group.id}`} class="flex flex-col items-start">
		<div class="flex w-full flex-col space-y-2">
			{#each guests as _, index}
				<div class="flex items-center">
					<Button type="button" onclick={() => removeGuest(index)}>
						<X color="red" class="h-8 w-8" />
					</Button>
					<div>
						<Label for="name">Name</Label>
						<Input name="name" bind:value={guests[index]} type="text" required />
					</div>
				</div>
			{/each}

			<Button type="button" onclick={addGuest} class="self-start">
				<Plus />
				New member
			</Button>
			<Button variant="outline" type="submit" class="mt-2 self-end">Add members</Button>
		</div>
	</form>
</Modal>
