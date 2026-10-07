# Admin setup (Supabase)

Admin page:  https://YOUR-SITE/admin.html

Already done for you in the Supabase project "Nicole-s-Frost-Flou":
- table `site_data`  (price list, photo-card prices, sold-out flags, testimonials). Anyone can read; only admins can change.
- table `admin_users` (emails allowed to edit).

You still need to do two things:
1. Supabase dashboard -> Authentication -> Users -> Add user -> "Create new user".
   Enter your admin email and a password, and tick "Auto Confirm User".
2. Supabase dashboard -> SQL Editor, run (with your real email):
       insert into public.admin_users (email) values ('you@example.com');

Recommended: Authentication -> Sign In / Providers -> Email -> turn OFF "Allow new users to sign up".
(Even if someone signs up, they cannot edit anything unless their email is in admin_users.)

Deploy this folder to Vercel as before. No environment variables are needed.
To add another admin: create the user, then insert their email into admin_users.
To remove an admin: delete their row from admin_users.
