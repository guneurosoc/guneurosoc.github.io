# INSTRUCTIONS.md — The Resume Protocol

> How Claude uses the other four files (CLAUDE.md, QUEUE.md, PLAN.md, STATE.md, CHANGELOG.md),
> every session, in every project this system is installed in.

---

## The five files and their one job each

| File | Job | Changes how often |
|---|---|---|
| `CLAUDE.md` | Project rules & constraints | Rarely |
| `QUEUE.md` | Raw inbox — new instructions dropped anytime, unsorted | Whenever the user adds something |
| `PLAN.md` | Current + upcoming tasks, maintained/broken-down | Occasionally |
| `STATE.md` | Exactly where the last session stopped | Constantly |
| `CHANGELOG.md` | Permanent record of completed work | Grows over time |

Never let jobs bleed across files. Completed work doesn't linger in PLAN.md. Permanent rules
don't go in PLAN.md. "What's done overall" doesn't go in STATE.md — that's CHANGELOG's job. New
instructions from the user don't go straight into PLAN.md — they land in QUEUE.md first and get
pulled from there (see QUEUE PROTOCOL below).

---

## STARTUP PROTOCOL — run this at the start of every session

1. Read `CLAUDE.md` in full.
2. Read `STATE.md` in full. Check `Status`:
   - `STOPPING_CLEAN` → trust it fully, proceed.
   - `IN_PROGRESS` → last action may be incomplete — verify the most recent recorded action
     before building on it.
   - `CRASHED_ASSUME_STALE` → run the "Verification steps" section in STATE.md before trusting
     anything else in the file.
3. Check `QUEUE.md`. If there's anything in it, that takes priority — see QUEUE PROTOCOL below
   for how to pull from it. If it's empty, fall back to `PLAN.md`'s "Current phase" section.
4. Skim recent entries in `CHANGELOG.md`.
5. State your understanding back to the user in a short paragraph — current task, current code
   state, exact next step — before touching anything. This is a cheap check that catches a wrong
   read before time gets wasted on it.
6. Begin work.

---

## QUEUE PROTOCOL — how new instructions get picked up

`QUEUE.md` is the drop-anytime inbox. The user adds to it two ways: typing directly into a live
Claude Code session, or opening the file and adding a line themselves with no Claude session
running at all.

If something is typed directly into a live session: if Claude is free (not mid-task), act on it
right away. If Claude is mid-task, don't interrupt the current work — add it to the bottom of
`QUEUE.md` instead and keep going, then pick it up once the current task reaches a proper
stopping point. Default to this rule rather than asking, since Claude may be running unattended
with nobody there to answer in the moment.

**Whenever a unit of work finishes — not just at session start — check `QUEUE.md` before
deciding what to work on next.** This is the key behavior: it's not only checked at startup, it's
checked every time Claude is about to pick its next task, so queued items get picked up promptly
rather than only at the next full session boot.

To pull an item from the queue:
1. Take the top item (unless another is explicitly marked urgent).
2. Remove it from `QUEUE.md`.
3. If it's substantial, break it down as a proper task in `PLAN.md` first, then start it. If it's
   small/self-contained, just start on it directly.
4. Optionally log it under "Recently pulled from queue" in `QUEUE.md` for the user's own tracking.
5. From here on, treat it exactly like any other task — full STATE.md discipline applies.

If the queue is empty, fall back to `PLAN.md` as normal.

---

## DURING-SESSION PROTOCOL — keeping STATE.md alive

Update STATE.md (overwrite the live fields, don't append):
- Before starting any new task or sub-task — write intent BEFORE acting, not after.
- Before anything risky/irreversible (schema change, bulk edit, delete, force push).
- After completing any meaningful chunk of work — update the checkpoint, move it to
  CHANGELOG.md, tick it off in PLAN.md.
- At minimum every 10-15 minutes of active work regardless.

Keep `Status: IN_PROGRESS` while actively working.

---

## END-OF-SESSION PROTOCOL — what to do when wrapping up (including near a usage-limit warning,
e.g. around the ~91% mark)

1. Finish or safely pause the current unit of work — prefer stopping at a task boundary over
   mid-edit if at all possible.
2. **Check `QUEUE.md` one more time before actually stopping.** If there's something in it and
   there's realistically enough of the session left to make meaningful progress on it, pull it
   and continue rather than stopping with idle capacity left. If there isn't enough left, leave
   it queued for next time — don't start something new that can't be safely paused before the
   limit hits.
3. Update STATE.md fully: exact task, next step, last command + result, anything half-finished,
   `Status: STOPPING_CLEAN`.
4. Move any newly-completed, verified work into `CHANGELOG.md`. Tick off finished items in
   `PLAN.md`.
5. **As your last message to the user, plainly state:**
   - what was just finished and what wasn't
   - whether it's safe to `/clear` (this should be the normal case, since STATE.md is fully
     up to date and nothing of value is left only in conversation context)
   - or, if there's live reasoning that isn't captured in STATE.md and would be lost by clearing
     (e.g. mid-debug across several files with hypotheses not yet written down), say so
     explicitly and recommend `/compact` instead, along with why
   - either way, tell the user the exact next step so they know what a fresh session should do

This message is for a human reading it later, not an automated process — write it plainly, no
jargon, so it's immediately clear what to do next regardless of how much time has passed.

---

## HOW TO ADD NEW INSTRUCTIONS MID-PROJECT

- **New task/feature request, dropped anytime, no waiting for Claude to be free** → paste into
  `QUEUE.md`. This is the normal way new work gets added. Claude pulls from here per the QUEUE
  PROTOCOL above.
- **New permanent rule/constraint** → paste into `CLAUDE.md` under "Hard rules" instead — this
  bypasses the queue since it's a standing rule, not a task to complete.

If it's unclear whether something is a one-off task (→ QUEUE.md) or a permanent rule (→
CLAUDE.md), Claude should say which one it thinks fits and why, and ask before filing it — unless
no one is available to answer, in which case default to QUEUE.md, since a task can always be
promoted to a permanent rule later if that turns out to be what was meant, whereas the reverse
is more awkward to unwind.

---

## A NOTE ON MULTIPLE PEOPLE WORKING ON THE SAME PROJECT

If someone else (e.g. a collaborator) picks up the same project on the same or a different
machine, after a full context clear, this system should work exactly the same way for them as for
you — that's the point of it. The startup protocol doesn't rely on anything carried over in a
person's head or in a specific Claude session; it only relies on the five files being current and
accurate — including `QUEUE.md`, so anything either of you dropped in gets picked up regardless
of who starts the next session. The one thing that actually matters is discipline: if a session
ends WITHOUT properly
following the end-of-session protocol (crash, force-quit, someone closes the terminal without
letting Claude wrap up), the next session — whoever starts it — will see `Status: IN_PROGRESS` or
find STATE.md stale, and should treat it with the same caution as the `CRASHED_ASSUME_STALE` case:
verify before trusting, rather than assuming the previous person's session left things clean.

---

## FIRST-TIME SETUP — installing this on a project

**New project:** Tell Claude Code — *"Set up the resume system: create CLAUDE.md, QUEUE.md,
PLAN.md, STATE.md, and CHANGELOG.md from the templates in this repo. This project is [describe it
in a sentence or two]. Known hard rules so far: [list any, or say 'none yet']. Fill in CLAUDE.md
and PLAN.md's current phase based on what I've described, then show me both before writing any
actual code."*

**Existing project:** Same prompt, plus — *"Read the existing codebase first — structure,
README, key files — and use that to fill in CLAUDE.md rather than leaving placeholders. Ask me to
confirm anything you're inferring rather than certain about, especially hard rules and scope
cuts, since those aren't reliably inferable from code alone."*

---

## ONGOING USAGE — the two things you actually do, day to day

1. **Add a task, any time, without waiting** → paste plain English into `QUEUE.md`. Works whether
   Claude is mid-session or nothing is running at all.
2. **Add a permanent rule** → paste plain English into `CLAUDE.md` under "Hard rules."

Everything else — reading files at startup, checking the queue between tasks, updating STATE.md
throughout, moving completed work to CHANGELOG.md, and telling you clearly what to do at the end
of a session — happens automatically as part of this protocol.
