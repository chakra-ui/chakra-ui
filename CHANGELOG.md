## 1.0.0-rc.3 (2020-08-30)

#### 🚀 Features

- `avatar`
  - [#1809](https://github.com/chakra-ui/chakra-ui/pull/1809) feat(avatar):
    added border radius prop to avatar group
    ([@bgopikrishna](https://github.com/bgopikrishna))
- `theme`
  - [#1583](https://github.com/chakra-ui/chakra-ui/pull/1583) feat(input): Add
    zIndex: 1 to focused input (v0 behaviour)
    ([@trevorblades](https://github.com/trevorblades))
- `core`
  - [#1458](https://github.com/chakra-ui/chakra-ui/pull/1458) Support Storybook
    Composition ([@jesstelford](https://github.com/jesstelford))

#### ⚙️ Component API

- `accordion`
  - [#1692](https://github.com/chakra-ui/chakra-ui/pull/1692) fix(accordion):
    move item props to accordion context
    ([@with-heart](https://github.com/with-heart))
- `core`, `theme-tools`, `theme`
  - [#1631](https://github.com/chakra-ui/chakra-ui/pull/1631) refactor:
    styleConfigs' internalization ([@hericlesme](https://github.com/hericlesme))
- `icon`
  - [#1722](https://github.com/chakra-ui/chakra-ui/pull/1722) Feat/extend create
    icon ([@ljosberinn](https://github.com/ljosberinn))
- `modal`
  - [#1726](https://github.com/chakra-ui/chakra-ui/pull/1726) fix(modal): fix
    ModalFooter to use the forwardRef utility
    ([@santialbo](https://github.com/santialbo))
- `tabs`
  - [#1656](https://github.com/chakra-ui/chakra-ui/pull/1656) Performance: Add
    isLazy property to Tabs ([@hericlesme](https://github.com/hericlesme))

#### ♿ Accessibility

- `button`, `theme`
  - [#1834](https://github.com/chakra-ui/chakra-ui/pull/1834) chore(button): add
    color exceptions for yellow and cyan buttons
    ([@with-heart](https://github.com/with-heart))
- Other
  - [#1828](https://github.com/chakra-ui/chakra-ui/pull/1828) perf(website):
    improve homepage lighthouse scores
    ([@with-heart](https://github.com/with-heart))
- `accordion`, `alert`, `avatar`, `breadcrumb`, `button`, `checkbox`,
  `clickable`, `close-button`, `collapse`, `control-box`, `drawer`, `editable`,
  `focus-lock`, `form-control`, `icon`, `image`, `input`, `layout`, `menu`,
  `modal`, `test-utils`
  - [#1527](https://github.com/chakra-ui/chakra-ui/pull/1527) Test/add a11y
    tests ([@ljosberinn](https://github.com/ljosberinn))

#### 🐛 Bugfixes

- `menu`
  - [#1808](https://github.com/chakra-ui/chakra-ui/pull/1808) fix(menu): give
    MenuList props style precedence
    ([@Sebastiansc](https://github.com/Sebastiansc))
- `descendant`, `menu`
  - [#1753](https://github.com/chakra-ui/chakra-ui/pull/1753) fix: fixed
    useDescendant to register/deregister items based on focuse…
    ([@mwood23](https://github.com/mwood23))
- `number-input`
  - [#1743](https://github.com/chakra-ui/chakra-ui/pull/1743) fix: Zero-out
    number input wrapper z-index
    ([@trevorblades](https://github.com/trevorblades))
  - [#1652](https://github.com/chakra-ui/chakra-ui/pull/1652) fix onChange
    callback activation on NumberInput
    ([@hericlesme](https://github.com/hericlesme))
- `avatar`
  - [#1668](https://github.com/chakra-ui/chakra-ui/pull/1668) fix(avatar):
    avatar group shows excess even when excess isn't hit
    ([@PierreAndreis](https://github.com/PierreAndreis))
- `color-mode`
  - [#1601](https://github.com/chakra-ui/chakra-ui/pull/1601) fix(color-mode):
    catch when localStorage is disabled ([@hy2k](https://github.com/hy2k))
- `icon`
  - [#1612](https://github.com/chakra-ui/chakra-ui/pull/1612) fix(Icon): custom
    icon library viewBox
    ([@neighborhood999](https://github.com/neighborhood999))
- `core`
  - [#1609](https://github.com/chakra-ui/chakra-ui/pull/1609) fix(core): flip
    load order of CSSReset and GlobalStyles
    ([@dustinlarimer](https://github.com/dustinlarimer))
- `checkbox`
  - [#1594](https://github.com/chakra-ui/chakra-ui/pull/1594) fix(checkbox):
    omit checkbox props from Icon spread
    ([@with-heart](https://github.com/with-heart))
- `theme`
  - [#1590](https://github.com/chakra-ui/chakra-ui/pull/1590) chore(Tag): change
    default size from lg to md
    ([@neighborhood999](https://github.com/neighborhood999))

#### 🤠 Types

- `accordion`, `alert`, `avatar`, `breadcrumb`, `button`, `checkbox`, `icon`,
  `input`, `layout`, `menu`, `modal`, `popover`, `tabs`
  - [#1764](https://github.com/chakra-ui/chakra-ui/pull/1764) fix(typescript):
    synthetic default export compat
    ([@ljosberinn](https://github.com/ljosberinn))
- `system`
  - [#1627](https://github.com/chakra-ui/chakra-ui/pull/1627) perf: widen As
    prop typing ([@with-heart](https://github.com/with-heart))

#### 📝 Documentation

- Other
  - [#1835](https://github.com/chakra-ui/chakra-ui/pull/1835) docs: updated
    example to indicate where merge util comes from. removed note about color
    mode ([@jmiazga](https://github.com/jmiazga))
  - [#1841](https://github.com/chakra-ui/chakra-ui/pull/1841) refactor(docs):
    remove nextjs optimization ([@ljosberinn](https://github.com/ljosberinn))
  - [#1769](https://github.com/chakra-ui/chakra-ui/pull/1769) docs: add pseudo
    props ([@ralphilius](https://github.com/ralphilius))
  - [#1784](https://github.com/chakra-ui/chakra-ui/pull/1784) docs: fix typo in
    theming ([@Brennvo](https://github.com/Brennvo))
  - [#1779](https://github.com/chakra-ui/chakra-ui/pull/1779) docs: Readme
    example usage typo ([@harveyhalwin](https://github.com/harveyhalwin))
  - [#1755](https://github.com/chakra-ui/chakra-ui/pull/1755) docs: first pass
    at the transitions docs ([@jmiazga](https://github.com/jmiazga))
  - [#1759](https://github.com/chakra-ui/chakra-ui/pull/1759) docs: restructure
    `Icon` page ([@with-heart](https://github.com/with-heart))
  - [#1728](https://github.com/chakra-ui/chakra-ui/pull/1728) fixing the links
    inside use-disclosure.mdx ([@keremciu](https://github.com/keremciu))
  - [#1724](https://github.com/chakra-ui/chakra-ui/pull/1724) docs: add
    `IconButton` to migration doc ([@baumandm](https://github.com/baumandm))
  - [#1716](https://github.com/chakra-ui/chakra-ui/pull/1716) Amend
    InitializeColorMode steps for Next.js
    ([@joe-bell](https://github.com/joe-bell))
  - [#1688](https://github.com/chakra-ui/chakra-ui/pull/1688) docs: updated
    transition section for modal and alert dialog
    ([@jmiazga](https://github.com/jmiazga))
  - [#1689](https://github.com/chakra-ui/chakra-ui/pull/1689) docs: called out
    that default chakra icons need to be imported from @chakra-ui/icons
    ([@jmiazga](https://github.com/jmiazga))
  - [#1677](https://github.com/chakra-ui/chakra-ui/pull/1677) docs: Update
    modal.mdx ([@trevorblades](https://github.com/trevorblades))
  - [#1662](https://github.com/chakra-ui/chakra-ui/pull/1662) docs: added not
    about RadioButtonGroup being deprecated
    ([@jmiazga](https://github.com/jmiazga))
  - [#1578](https://github.com/chakra-ui/chakra-ui/pull/1578) feat(docs): add
    Chakra exports as mdx shortcodes
    ([@with-heart](https://github.com/with-heart))
  - [#1576](https://github.com/chakra-ui/chakra-ui/pull/1576)
    docs(installation): add CRA templates guide note
    ([@with-heart](https://github.com/with-heart))
  - [#1584](https://github.com/chakra-ui/chakra-ui/pull/1584) feat(docs): add
    size hints in Text's and Heading's documentation
    ([@fr3fou](https://github.com/fr3fou))
- `utils`
  - [#1754](https://github.com/chakra-ui/chakra-ui/pull/1754) docs: add ref to
    IE11 window memory leak issue
    ([@navin-moorthy](https://github.com/navin-moorthy))
- `core`, `theme-tools`, `theme`
  - [#1631](https://github.com/chakra-ui/chakra-ui/pull/1631) refactor:
    styleConfigs' internalization ([@hericlesme](https://github.com/hericlesme))

#### Committers: 28

- Brennan ([@Brennvo](https://github.com/Brennvo))
- CodinCat ([@CodinCat](https://github.com/CodinCat))
- Dave Bauman ([@baumandm](https://github.com/baumandm))
- Dustin Larimer ([@dustinlarimer](https://github.com/dustinlarimer))
- Gerrit Alex ([@ljosberinn](https://github.com/ljosberinn))
- Gopi Krishna ([@bgopikrishna](https://github.com/bgopikrishna))
- Heinek Halwin ([@harveyhalwin](https://github.com/harveyhalwin))
- Héricles Emanuel ([@hericlesme](https://github.com/hericlesme))
- James Gee ([@Geeman201](https://github.com/Geeman201))
- Jason Miazga ([@jmiazga](https://github.com/jmiazga))
- Jess Telford ([@jesstelford](https://github.com/jesstelford))
- Joe Bell ([@joe-bell](https://github.com/joe-bell))
- Kerem Sevencan ([@keremciu](https://github.com/keremciu))
- Mansour benyoucef ([@benyou1969](https://github.com/benyou1969))
- Marcus Wood ([@mwood23](https://github.com/mwood23))
- Mark Chandler ([@with-heart](https://github.com/with-heart))
- Navin Moorthy ([@navin-moorthy](https://github.com/navin-moorthy))
- Patrick Cason ([@cereallarceny](https://github.com/cereallarceny))
- Peng Jie ([@neighborhood999](https://github.com/neighborhood999))
- Pierre Ortega ([@PierreAndreis](https://github.com/PierreAndreis))
- Santi Albo ([@santialbo](https://github.com/santialbo))
- Sebastian Cruz ([@Sebastiansc](https://github.com/Sebastiansc))
- Simo Aleksandrov ([@fr3fou](https://github.com/fr3fou))
- Trevor Blades ([@trevorblades](https://github.com/trevorblades))
- [@hy2k](https://github.com/hy2k)
- ralphilius ([@ralphilius](https://github.com/ralphilius))
- victory ([@vickywane](https://github.com/vickywane))
