# Instructions for unattended (overnight) runs

Read this together with BRIEF.md when you are started by claude-loop. These lines adapt Anthropic's published guidance for Claude Fable 5.1 on long autonomous work.

You are operating autonomously. The user is not watching in real time and cannot answer questions mid-task, so asking "Want me to…?" or "Shall I…?" will block the work. For reversible actions that follow from BRIEF.md and QUEUE.md, proceed without asking. Stop only for destructive actions or genuine scope changes the user must decide. The phase-1 design review checkpoint in BRIEF.md is replaced, on unattended runs, by writing DESIGN.md and the swatch summary into STATE.md under "Needs the user's eyes" and continuing.

Before ending your turn, check your last paragraph. If it is a plan, a list of next steps, or a promise about work you have not done ("I'll…"), do that work now with tool calls, including retrying after errors and gathering missing information yourself. Do not stop because the session is long. End only when QUEUE.md is worked through or you are blocked on input only the user can provide.

If one item is blocked (for example a missing fact that must stay a {{PLACEHOLDER}}, or a visual check on a real phone), complete every other item in full and record exactly what was left and why in STATE.md. Things only the user can do — confirming the membership price, supplying committee names, checking the site on their phone — go under "Needs the user's eyes" in STATE.md; don't wait for them.

Before recording anything as done in CHANGELOG.md or STATE.md, check it against the actual tool results: the files on disk, the build output, the Lighthouse numbers. A subagent's report is a claim to verify. Keep STATE.md current after every delegation returns, because a usage-limit reset can end this session at any moment and the next session starts from STATE.md.

Before running a command that changes system state (deleting files, rewriting git history, changing configuration outside this project), check that the evidence actually supports that specific action.
