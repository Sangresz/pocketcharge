-- supabase/seed.sql
--
-- create test users
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token,
        is_super_admin
    ) values (
        '00000000-0000-0000-0000-000000000000',
        uuid_generate_v4 (),
        'authenticated',
        'authenticated',
        'test@gmail.com',
        crypt ('password123', gen_salt ('bf')),
        current_timestamp,
        current_timestamp,
        current_timestamp,
        '{"provider":"email","providers":["email"]}',
        '{}',
        current_timestamp,
        current_timestamp,
        '',
        '',
        '',
        '',
        true
    );

-- test user email identities
INSERT INTO
    auth.identities (
        user_id,
        identity_data,
        provider,
        provider_id,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            id,
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );