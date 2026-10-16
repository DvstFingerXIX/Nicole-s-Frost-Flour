# Admin guide (Supabase)

Admin page:  https://YOUR-SITE/admin.html   (sign in with your admin email + password)

Tabs
- Price list   prices, names, notes, sold out, bestseller switch, flavor-choice switch, bulk tools (sold out all / change all prices), reorder.
- Photo cards  upload new photo cards, replace photos, prices, sold out.
- Testimonials customer reviews, optional screenshot, show/hide.
- Site info    announcement banner, highlights under the headline, info cards (how to order / delivery / payment), flavor list.
- Orders       orders logged from the website, status (new / preparing / done / cancelled), top sellers, weekly totals.
- History      (top bar) load any of the last 30 earlier versions, then press Save to make it live.

Saving: nothing changes on the site until you press "Save changes". The "Updated" date under the headline sets itself on every save.

Database (already created in Supabase project "Nicole-s-Frost-Flou"):
  site_data, site_data_history, orders, admin_users, and a public storage bucket "photos".
Add another admin: create the user in Authentication -> Users, then run
  insert into public.admin_users (email) values ('someone@example.com');
Deploy this folder to Vercel as before. No environment variables are needed.
