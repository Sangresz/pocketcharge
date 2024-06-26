import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url }) => {
  return {
    error: url.searchParams.get("error")
  }
}