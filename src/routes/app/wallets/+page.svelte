<script lang="ts">
  import * as icons from '$lib/assets/icons/index'
  import type { Wallet } from '$lib/types'

  const { data } = $props();

  let wallets: Wallet[] = data.wallets;
</script>

{#snippet wallet_snippet({name, icon, currency, balance}: Wallet)}
  <div id="wallet" class="flex items-center space-x-2 border border-slate-600 p-2 rounded-sm">
    <img src={icons[icon]} class="w-6 h-6" alt={icon} />
    <div class="flex flex-col w-16">
      <div class="text-sm">
        {name}
      </div>
      <div class="font-bold">
        {currency}
        {balance}
      </div>
    </div>
  </div>
{/snippet}

<div class="grid grid-cols-2 gap-4">
  {#each wallets as wallet}
    {@render wallet_snippet(wallet)}
  {/each}
</div>