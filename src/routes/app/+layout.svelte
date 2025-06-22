<script>
  let { children } = $props()
</script>

<div
	class="mx-auto flex w-full flex-col space-y-4 lg:px-64 lg:pt-4 sm:space-y-6 sm:px-4"
>
  {@render children()}
</div>