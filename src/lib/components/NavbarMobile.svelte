<script lang="ts">
  import { Wallet, Home, Plus, Users } from 'lucide-svelte';
</script>

<div class="flex space-x-2 absolute bottom-0">
  <a href="/app/wallets" class="border rounded-full p-2 w-16 h-16 border-slate-300 flex flex-col items-center">
    <span class="text-sm">Wallet</span>
    <Wallet class="w-8 h-8" />
  </a>
  <a href="/app" class="border rounded-full p-2 w-16 h-16 border-slate-300 flex flex-col items-center">
    <span class="text-sm">Home</span>
    <Home class="h-8 w-8" />
  </a>
  <a href="/app/charges/new" class="border rounded-full p-2 w-16 h-16 border-slate-300 flex flex-col items-center">
    <span class="text-sm">New</span>
    <Plus class="h-8 w-8" />
  </a>
  <a href="/app/groups" class="border rounded-full p-2 w-16 h-16 border-slate-300 flex flex-col items-center">
    <span class="text-sm">Groups</span>
    <Users class="h-8 w-8" />
  </a>
</div>