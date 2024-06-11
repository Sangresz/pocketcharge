<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<div class="flex items-center justify-center">
  <form method="POST" action="?/login" class="p-12 bg-zinc-100 flex flex-col space-y-6">
    <div class="flex flex-col space-y-3">
      <label for="input_email">
        Email
      </label>
      <input id="input_email" name="email" type="email" autocomplete="email" class="border border-zinc-100 py-2 px-4"/>
    </div>
    <div class="flex flex-col space-y-3">
      <label for="input_password">
        Password
      </label>
      <input id="input_password" name="password" type="password" class="border border-zinc-100 py-2 px-4"/>
    </div>
    <Button type="submit">Login</Button>
    <Button type="submit" formaction="?/signup" variant="outline">Sign up</Button>
  </form>
</div>
