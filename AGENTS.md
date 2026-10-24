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
- Keep catechetical units in typed data modules and reuse the same catalog in lessons, the path and the library so titles, order and teaching sources stay consistent.
- Render lesson sessions keyed by lesson ID so navigation to a different lesson resets answers, feedback and completion state.
- Use a shared mascot-reaction component with fixed-size stages and CSS transform/opacity animation so feedback remains smooth without shifting the lesson layout.
- Keep sourced prayer texts and rosary mysteries in typed data modules, with a pure sequence builder reused by the guided reader and tests, so traditional order stays consistent.
- Keep prayer routes public and prayer-session state separate from learning progress; use session-scoped browser state for the guest prayer experience so no account or XP changes are needed.
