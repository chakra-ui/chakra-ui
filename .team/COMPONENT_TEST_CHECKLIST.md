# Component Test Checklist

This document contains a checklist of items that must be completed in order for
a component module to be considered fully tested. Not every checklist item
applies to every component module, so use common sense in applying these items.

- [ ] Common use cases snapshotted
- [ ] Common use cases run through `axe`/`toHaveNoViolations`
- [ ] `role`/`aria`/`data` attributes tested
- [ ] Component behaviors tested (reacts to events, handles callbacks
      appropriately, updates state correctly, etc.)
- [ ] Controlled/uncontrolled use cases tested
- [ ] Associated utils/helpers/etc. tested
