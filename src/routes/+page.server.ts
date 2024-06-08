import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: countries } = await supabase.from('countries').select('name')
  return { countries: countries ?? [] }
}