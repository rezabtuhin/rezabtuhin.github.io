# Supabase inactivity and scheduled database checks

The portfolio uses the `snacks` Supabase project for signed PDF links and original
image URLs. Optimized image variants are served locally by GitHub Pages, so most
image views do not contact Supabase at all.

Supabase's Free plan assesses database activity over a seven-day window. Its
[pausing documentation](https://supabase.com/docs/guides/platform/free-project-pausing)
says a few database requests each day are typically enough. File downloads or a
ping to the website are not a reliable substitute for database queries. Scheduled
requests are a best-effort measure; a paid Supabase plan prevents inactivity pausing.

## Activate the workflow

1. Open the Supabase dashboard for project `xizhvfokbwpywdhmevcs` and click
   **Resume project**. Wait until it is healthy. This workflow cannot resume an
   already paused project.
2. Run [supabase-heartbeat.sql](supabase-heartbeat.sql) in the project's SQL Editor.
   Ensure `public` is included in the schemas exposed by the Data API and that the
   Data API is enabled. The SQL creates one public row with read-only access for
   the anonymous role; it does not grant access to storage or other tables.
3. Copy the project's publishable API key (`sb_publishable_...`) from Supabase
   **Settings > API Keys**. Do not use a secret or `service_role` key.
4. In this GitHub repository, open **Settings > Secrets and variables > Actions**.
   Add a repository secret named `SUPABASE_PUBLISHABLE_KEY` with that value.
5. Commit and push `.github/workflows/supabase-keepalive.yml` to the repository's
   default branch. Also commit these instructions and the SQL file for reference.
6. Open **Actions > Supabase keepalive > Run workflow**. Verify that the run reports
   `Supabase database query succeeded.` A missing key, failed request, missing row,
   or incorrect read policy will fail the job instead of reporting success.

The cron expression `17 */8 * * *` runs at 00:17, 08:17, and 16:17 UTC, corresponding
to 06:17, 14:17, and 22:17 in Asia/Dhaka. Manual runs query immediately.
The query reads one integer; it does not
download PDFs, modify database rows, or rebuild/deploy the portfolio. No local
computer needs to remain on. The API key is passed through the `apikey` header,
as required for [publishable keys](https://supabase.com/docs/guides/getting-started/api-keys).

## Limits and alternatives

[GitHub scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
run from the default branch, may be delayed or dropped under load, and are disabled
in public repositories after 60 days without repository activity. Keep an eye on
the Actions tab and re-enable the workflow if needed. A schedule inside the same
Supabase project cannot run while that project is paused.

For assets that must remain available without depending on database activity,
store the PDFs and images in this site's `public/` directory and serve them through
GitHub Pages, or use a Supabase paid plan. Signed storage URLs also have expiration
dates; database activity does not renew those URLs.
