<script lang="ts">
  import logo from '$lib/assets/pocket_charge_logo.png';
  import Button from './ui/button/button.svelte';
</script>

<nav class="bg-zinc-300 flex items-center justify-between px-8 py-4">
  <div class="flex items-center">
    <img class="w-16 h-16" src={logo} alt="pocketcharge logo" />
    <a href="/" class="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-zinc-500">PocketCharge</a>
  </div>
  <div class="flex items-center space-x-2">
    <Button href="/auth/login">Login</Button>
    <Button href="/auth/signup">Sign up</Button>
  </div>
</nav>