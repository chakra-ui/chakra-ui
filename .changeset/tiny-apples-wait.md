---
"@chakra-ui/pin-input": minor
---

Previously isComplete was being determined based off of old state values as it
was determined before the setState took effect. This caused the last pin-input
entry to not call onComplete when updated. Updating the isComplete check to
reference the next values (the value of the state after rerender) allows the
check to use the most up to date values in the pin-input fields fixing the last
digit update issue.
