---
"@chakra-ui/theme": patch
---

Add explicit color attribute on buttons to ensure consistency across light and
dark modes.

**🚨 Potentially Breaking Change 🚨 **

If your button component code relies on inheriting color on buttons, consider
adding an explicit color.
