create table "public"."charges" (
    "id" uuid not null default gen_random_uuid(),
    "title" varchar not null,
    "price" real not null,
    "is_expense" boolean not null default true,
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);

alter table "public"."charges" add constraint "public_charges_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."charges" validate constraint "public_charges_user_id_fkey";

alter table "public"."charges" enable row level security;

CREATE UNIQUE INDEX charges_pkey ON public.charges USING btree (id);

alter table "public"."charges" add constraint "charges_pkey" PRIMARY KEY using index "charges_pkey";

grant select on table "public"."charges" to "public";

create policy "Enable read for users based on user_id"
    on "public"."charges"
    as permissive
    for select
    to authenticated
    using ((( SELECT auth.uid() AS uid) = user_id));