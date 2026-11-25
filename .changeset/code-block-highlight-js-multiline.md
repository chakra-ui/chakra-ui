---
"@chakra-ui/react": patch
---

Fix the `highlight.js` code block adapter breaking on multi-line tokens. A block
comment or template string spans several lines in one `highlight.js` span, so
splitting the output on newlines nested every following line inside the first
one and dropped the token class after its first line.
