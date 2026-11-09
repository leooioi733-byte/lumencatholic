<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Lumen architecture
- Keep catechetical units in typed data modules and reuse the same catalog in lessons, the path and the library; append new units without changing existing lesson IDs or order so teaching sources stay consistent and saved progress remains valid.
- Render lesson sessions keyed by lesson ID so navigation to a different lesson resets answers, feedback and completion state.
- Keep lesson answer feedback and completion independent of decorative imagery so presentation changes never affect answers, audio or XP.
- Keep sourced prayer texts and rosary mysteries in typed data modules, with a pure sequence builder reused by the guided reader and tests, so traditional order stays consistent.
- Keep prayer routes public and prayer-session state separate from learning progress; use session-scoped browser state for the guest prayer experience so no account or XP changes are needed.
- Keep audio in a shared browser-only engine and provider; initialize after a user gesture, pause on hidden tabs, and persist only device sound preferences independently of profile and XP.
- Mark selection buttons with data-sound="select" and play answer feedback only from the lesson verification handler so rerenders cannot replay effects.
- Keep the liturgical calendar as a pure data/computation module (fixed rows + Easter-based moveable feasts, Brazilian transfers) so the page and tests share it.
- Keep museum exhibits in a typed, sourced catalog shared by the gallery and detail pages; store real photo asset pointers with attribution and distinguish historical events, devotional tradition and what each image actually depicts.
- Serve the full Bible as per-book static JSON in public/biblia/ with a typed index in src/lib/bible-books.ts, fetched on demand so the 73 books never enter the JS bundle.
- Keep appearance, reading size and motion in a shared device-settings provider, independent of accounts, prayer sessions and XP; apply appearance through semantic CSS tokens and reuse reading controls across Bible and prayers so preferences stay consistent without changing progress.
- Keep explicit chapter-read progress in its own browser provider and validated storage, separate from XP; derive Bible percentages from canonical chapter totals and lesson percentages from unique catalog IDs so browsing and repeat completions cannot inflate statistics.
- Keep local profile edits typed and restricted to personal fields, preserving onboarding answers and progress; reuse existing device settings rather than duplicating them in the account.
- Keep seasonal appearances in the existing device-settings catalog and semantic CSS tokens; swap only decorative symbols through shared theme helpers, leaving sourced content, control labels and saved choices unchanged.
- Mount one persistent mascot provider and GlobalMascot at the root; dispatch presentation events from verified lesson handlers without changing XP, and collision-check painted content to keep the companion clear of navigation and controls.
- Store validated mascot outfit choices in the existing local profile and synchronize same-tab profile edits; dress the official portrait with separate accessory overlays so its face and proportions never change.
