<form method="POST" action="?/login" class="flex flex-col gap-2">
  <label for="email">Email</label>
  <input name="email" type="email" required class="border border-border rounded-md p-2"/>
  <label for="password">Password</label>
  <input name="password" type="password" required class="border border-border rounded-md p-2"/>
  <button type="submit">Login</button>
  <button formaction="?/signup">Sign up</button>
</form>