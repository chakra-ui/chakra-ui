---
"@chakra-ui/styled-system": minor
---

## 📝 Description

Adds support for CSS logical properties and `direction` in the theme for future
RTL optimizations.

## 🚀 New behavior

Make it possible to pass css logical style props or shorthand props. For
example, to pass bi-directional margin-left, users will change `ml` to `ms` OR
`marginLeft` ot `marginStart`.

```jsx
// not RTL friendly 🚨
<Box ml="20px" />

// Good ✅
<Box marginStart="20px" />

// or use shorthand for margin-left bi-directional ✅
<Box ms="20px" />
```

Here's a list of possible bi-directional shorthand style props you can pass in
addition to most css logical properties:

| Prop               | LTR value                                      | RTL value                                      |
| ------------------ | ---------------------------------------------- | ---------------------------------------------- |
| ms                 | marginLeft                                     | marginRight                                    |
| marginStart        | marginLeft                                     | marginRight                                    |
| me                 | marginRight                                    | marginLeft                                     |
| marginEnd          | marginRight                                    | marginLeft                                     |
| ps                 | paddingLeft                                    | paddingRight                                   |
| paddingStart       | paddingLeft                                    | paddingRight                                   |
| pe                 | paddingRight                                   | paddingLeft                                    |
| paddingEnd         | paddingRight                                   | paddingLeft                                    |
| insetStart         | left                                           | right                                          |
| insetEnd           | right                                          | left                                           |
| borderStartWidth   | borderLeftWidth                                | borderRightWidth                               |
| borderEndWidth     | borderRightWidth                               | borderLeftWidth                                |
| borderStartRadius  | borderTopLeftRadius + borderBottomLeftRadius   | borderTopRightRadius + borderBottomRightRadius |
| borderEndRadius    | borderTopRightRadius + borderBottomRightRadius | borderTopLeftRadius + borderBottomLeftRadius   |
| roundedStart       | borderTopLeftRadius + borderBottomLeftRadius   | borderTopRightRadius + borderBottomRightRadius |
| roundedEnd         | borderTopRightRadius + borderBottomRightRadius | borderTopLeftRadius + borderBottomLeftRadius   |
| roundedTopStart    | borderTopLeftRadius                            | borderTopRightRadius                           |
| roundedTopEnd      | borderTopRightRadius                           | borderTopLeftRadius                            |
| roundedBottomStart | borderBottomLeftRadius                         | borderBottomRightRadius                        |
| roundedBottomEnd   | borderBottomRightRadius                        | borderBottomLeftRadius                         |
