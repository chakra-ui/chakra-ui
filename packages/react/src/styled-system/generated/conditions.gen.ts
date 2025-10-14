export interface Conditions {
  /** `@media (hover: hover),&:is(:hover, [data-hover]):not(:disabled, [data-disabled])` */
  _hover: string
  /** `&:is(:active, [data-active]):not(:disabled, [data-disabled], [data-state=open])` */
  _active: string
  /** `&:is(:focus, [data-focus])` */
  _focus: string
  /** `&:is(:focus-within, [data-focus-within])` */
  _focusWithin: string
  /** `&:is(:focus-visible, [data-focus-visible])` */
  _focusVisible: string
  /** `&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])` */
  _disabled: string
  /** `&:visited` */
  _visited: string
  /** `&:target` */
  _target: string
  /** `&:is([data-readonly], [aria-readonly=true], [readonly])` */
  _readOnly: string
  /** `&:read-write` */
  _readWrite: string
  /** `&:is(:empty, [data-empty])` */
  _empty: string
  /** `&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked])` */
  _checked: string
  /** `&:enabled` */
  _enabled: string
  /** `&:is([aria-expanded=true], [data-expanded], [data-state=expanded])` */
  _expanded: string
  /** `&[data-highlighted]` */
  _highlighted: string
  /** `&[data-complete]` */
  _complete: string
  /** `&[data-incomplete]` */
  _incomplete: string
  /** `&[data-dragging]` */
  _dragging: string
  /** `&::before` */
  _before: string
  /** `&::after` */
  _after: string
  /** `&::first-letter` */
  _firstLetter: string
  /** `&::first-line` */
  _firstLine: string
  /** `&::marker` */
  _marker: string
  /** `&::selection` */
  _selection: string
  /** `&::file-selector-button` */
  _file: string
  /** `&::backdrop` */
  _backdrop: string
  /** `&:first-of-type` */
  _first: string
  /** `&:last-of-type` */
  _last: string
  /** `&:not(:first-of-type)` */
  _notFirst: string
  /** `&:not(:last-of-type)` */
  _notLast: string
  /** `&:only-child` */
  _only: string
  /** `&:nth-of-type(even)` */
  _even: string
  /** `&:nth-of-type(odd)` */
  _odd: string
  /** `.peer:is(:focus, [data-focus]) ~ &` */
  _peerFocus: string
  /** `.peer:is(:hover, [data-hover]):not(:disabled, [data-disabled]) ~ &` */
  _peerHover: string
  /** `.peer:is(:active, [data-active]):not(:disabled, [data-disabled]) ~ &` */
  _peerActive: string
  /** `.peer:focus-within ~ &` */
  _peerFocusWithin: string
  /** `.peer:is(:focus-visible, [data-focus-visible]) ~ &` */
  _peerFocusVisible: string
  /** `.peer:is(:disabled, [disabled], [data-disabled]) ~ &` */
  _peerDisabled: string
  /** `.peer:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) ~ &` */
  _peerChecked: string
  /** `.peer:is(:invalid, [data-invalid], [aria-invalid=true]) ~ &` */
  _peerInvalid: string
  /** `.peer:is([aria-expanded=true], [data-expanded], [data-state=expanded]) ~ &` */
  _peerExpanded: string
  /** `.peer:placeholder-shown ~ &` */
  _peerPlaceholderShown: string
  /** `.group:is(:focus, [data-focus]) &` */
  _groupFocus: string
  /** `.group:is(:hover, [data-hover]):not(:disabled, [data-disabled]) &` */
  _groupHover: string
  /** `.group:is(:active, [data-active]):not(:disabled, [data-disabled]) &` */
  _groupActive: string
  /** `.group:focus-within &` */
  _groupFocusWithin: string
  /** `.group:is(:focus-visible, [data-focus-visible]) &` */
  _groupFocusVisible: string
  /** `.group:is(:disabled, [disabled], [data-disabled]) &` */
  _groupDisabled: string
  /** `.group:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) &` */
  _groupChecked: string
  /** `.group:is([aria-expanded=true], [data-expanded], [data-state=expanded]) &` */
  _groupExpanded: string
  /** `.group:invalid &` */
  _groupInvalid: string
  /** `&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])` */
  _indeterminate: string
  /** `&:is([data-required], [aria-required=true])` */
  _required: string
  /** `&:is([data-valid], [data-state=valid])` */
  _valid: string
  /** `&:is([data-invalid], [aria-invalid=true], [data-state=invalid])` */
  _invalid: string
  /** `&:autofill` */
  _autofill: string
  /** `&:is(:in-range, [data-in-range])` */
  _inRange: string
  /** `&:is(:out-of-range, [data-outside-range])` */
  _outOfRange: string
  /** `&::placeholder, &[data-placeholder]` */
  _placeholder: string
  /** `&:is(:placeholder-shown, [data-placeholder-shown])` */
  _placeholderShown: string
  /** `&:is([aria-pressed=true], [data-pressed])` */
  _pressed: string
  /** `&:is([aria-selected=true], [data-selected])` */
  _selected: string
  /** `&:is([aria-grabbed=true], [data-grabbed])` */
  _grabbed: string
  /** `&[data-state=under-value]` */
  _underValue: string
  /** `&[data-state=over-value]` */
  _overValue: string
  /** `&[data-state=at-value]` */
  _atValue: string
  /** `&:default` */
  _default: string
  /** `&:optional` */
  _optional: string
  /** `&:is([open], [data-open], [data-state=open])` */
  _open: string
  /** `&:is([closed], [data-closed], [data-state=closed])` */
  _closed: string
  /** `&:is(:fullscreen, [data-fullscreen])` */
  _fullscreen: string
  /** `&:is([data-loading], [aria-busy=true])` */
  _loading: string
  /** `&:is([hidden], [data-hidden])` */
  _hidden: string
  /** `&[data-current]` */
  _current: string
  /** `&[aria-current=page]` */
  _currentPage: string
  /** `&[aria-current=step]` */
  _currentStep: string
  /** `&[data-today]` */
  _today: string
  /** `&[data-unavailable]` */
  _unavailable: string
  /** `&[data-range-start]` */
  _rangeStart: string
  /** `&[data-range-end]` */
  _rangeEnd: string
  /** `&[data-now]` */
  _now: string
  /** `&[data-topmost]` */
  _topmost: string
  /** `@media (prefers-reduced-motion: reduce)` */
  _motionReduce: string
  /** `@media (prefers-reduced-motion: no-preference)` */
  _motionSafe: string
  /** `@media print` */
  _print: string
  /** `@media (orientation: landscape)` */
  _landscape: string
  /** `@media (orientation: portrait)` */
  _portrait: string
  /** `.dark &, .dark .chakra-theme:not(.light) &` */
  _dark: string
  /** `:root &, .light &` */
  _light: string
  /** `@media (prefers-color-scheme: dark)` */
  _osDark: string
  /** `@media (prefers-color-scheme: light)` */
  _osLight: string
  /** `@media (forced-colors: active)` */
  _highContrast: string
  /** `@media (prefers-contrast: less)` */
  _lessContrast: string
  /** `@media (prefers-contrast: more)` */
  _moreContrast: string
  /** `[dir=ltr] &` */
  _ltr: string
  /** `[dir=rtl] &` */
  _rtl: string
  /** `&::-webkit-scrollbar` */
  _scrollbar: string
  /** `&::-webkit-scrollbar-thumb` */
  _scrollbarThumb: string
  /** `&::-webkit-scrollbar-track` */
  _scrollbarTrack: string
  /** `&[data-orientation=horizontal]` */
  _horizontal: string
  /** `&[data-orientation=vertical]` */
  _vertical: string
  /** `& :where(svg)` */
  _icon: string
  /** `@starting-style` */
  _starting: string
  /** `@media screen and (min-width: 30rem)` */
  sm: string
  /** `@media screen and (min-width: 30rem) and (max-width: 47.9975rem)` */
  smOnly: string
  /** `@media screen and (max-width: 29.9975rem)` */
  smDown: string
  /** `@media screen and (min-width: 48rem)` */
  md: string
  /** `@media screen and (min-width: 48rem) and (max-width: 63.9975rem)` */
  mdOnly: string
  /** `@media screen and (max-width: 47.9975rem)` */
  mdDown: string
  /** `@media screen and (min-width: 64rem)` */
  lg: string
  /** `@media screen and (min-width: 64rem) and (max-width: 79.9975rem)` */
  lgOnly: string
  /** `@media screen and (max-width: 63.9975rem)` */
  lgDown: string
  /** `@media screen and (min-width: 80rem)` */
  xl: string
  /** `@media screen and (min-width: 80rem) and (max-width: 95.9975rem)` */
  xlOnly: string
  /** `@media screen and (max-width: 79.9975rem)` */
  xlDown: string
  /** `@media screen and (min-width: 96rem)` */
  "2xl": string
  /** `@media screen and (min-width: 96rem)` */
  "2xlOnly": string
  /** `@media screen and (max-width: 95.9975rem)` */
  "2xlDown": string
  /** `@media screen and (min-width: 30rem) and (max-width: 47.9975rem)` */
  smToMd: string
  /** `@media screen and (min-width: 30rem) and (max-width: 63.9975rem)` */
  smToLg: string
  /** `@media screen and (min-width: 30rem) and (max-width: 79.9975rem)` */
  smToXl: string
  /** `@media screen and (min-width: 30rem) and (max-width: 95.9975rem)` */
  smTo2xl: string
  /** `@media screen and (min-width: 48rem) and (max-width: 63.9975rem)` */
  mdToLg: string
  /** `@media screen and (min-width: 48rem) and (max-width: 79.9975rem)` */
  mdToXl: string
  /** `@media screen and (min-width: 48rem) and (max-width: 95.9975rem)` */
  mdTo2xl: string
  /** `@media screen and (min-width: 64rem) and (max-width: 79.9975rem)` */
  lgToXl: string
  /** `@media screen and (min-width: 64rem) and (max-width: 95.9975rem)` */
  lgTo2xl: string
  /** `@media screen and (min-width: 80rem) and (max-width: 95.9975rem)` */
  xlTo2xl: string
  /** The base (=no conditions) styles to apply  */
  base: string
}
