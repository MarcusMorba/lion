# Overlay occurrences

This document provides an outline of all possible occurrences of overlays found in applications in
general and thus provided by Lion.
For all concepts referred to in this document, please read [Overlays Manager](OverlaysManager.md).

## Local and global overlay controllers
Currently, we have a global and a local overlay controller.
They handle all positioning logic, accessibility and automatic interaction patterns,
based on provided config.

All of their configuration options are described below in ResponsiveOverlay.

## Responsive overlay
Based on screen size, we might want to switch the appearance of an overlay.
For instance: an application menu might be displayed as a dropdown on desktop,
but as a bottom sheet on mobile.
Similarly, a dialog might be displayed as a popover on desktop, but as a (global) dialog on mobile.

To implement such a flexible overlay, we need an 'umbrella' layer that allows for switching between

Luckily, interfaces of Global and OverlayControllers are very similar.
Therefore we can make a wrapping ResponsiveOverlayController.

### Configuration options for local and global overlays

In total, we could end up with these configuration options for it (all Booleans default to false):
```
- {Element} elementToFocusAfterHide - the element that should be called `.focus()` on after dialog closes
- {Boolean} hasBackdrop - whether it should have a backdrop (currently exclusive to globalOverlayController)
- {Boolean} isBlocking - hides other overlays when mutiple are opened (currently exclusive to globalOverlayController)
- {Boolean} preventsScroll - prevents scrolling body content when overlay opened (currently exclusive to globalOverlayController)
- {Boolean} trapsKeyboardFocus - rotates tab, implicitly set when 'isModal'
- {Boolean} hidesOnEsc - hides the overlay when pressing [esc]
- {Boolean} hidesOnOutsideClick - hides hides the overlay when clicking next to it, exluding invoker. (currently exclusive to localOverlayController)
- {String} placement - vertical/horizontal position to be supplied to `managePosition`. See https://github.com/ing-bank/lion/pull/61 for current api discussions
- {String} cssPosition - 'absolute' or 'fixed'. TODO: choose name that cannot be mistaken for placement like cssPosition or positioningTechnique: https://github.com/ing-bank/lion/pull/61
- {TemplateResult} contentTemplate
- {TemplateResult} invokerTemplate (currently exclusive to localOverlayController)
- {Element} invokerNode (currently exclusive to localOverlayController)
- {Element} contentNode (currently exclusive to localOverlayController)
```

These options are suggested to be added to the current ones:
```
- {Boolean} isModal - sets aria-modal and/or aria-hidden="true" on siblings
- {Boolean} isGlobal - determines the connection point in DOM (body vs handled by user)
- {Boolean} isTooltip - has a totally different interaction - and accessibility pattern than all
other overlays, so needed for internals.
- {Boolean} handlesUserInteraction - sets toggle on click, or hover when 'isTooltip'
- {Boolean} handlesAccessibility -
  - For non tooltips: sets aria-expanded="true/false" when and aria-haspopup="true"
  - For tooltips: sets role="tooltip" on the invoker
  - Returns focus to invokerNode on hide
  - Sets focus to dialog content (?)
- {Object} placementConfig
- {Object} placementConfig.verticalMargin
- {Object} placementConfig.horizontalMargin
- {Object} placementConfig.viewportMargin
- {Element} pointerNode - the arrow element that is optionally provided and will point to the middle of the invoker
```

What we should think about more properly is a global placement option (positioned relative to window instead of invoker)
```
// TODO: namings very much under construction (we should also reconsider 'placement' names, see: https://github.com/ing-bank/lion/pull/61)
// Something like the drawing Joren made: https://github.com/ing-bank/lion/issues/36#issuecomment-491855381
- {String} globalPlacement:
  - primary: 'center', 'bottom', 'top', 'left', 'right'
  - justify (secondary): 'middle', 'start', 'end', 'fullwidth'
```

## Controllers/behaviors
Controllers/behaviors provide preconfigured configuration objects for the global/local
overlay controllers.

#### Dialog
```js
{
  isGlobal: true,
  isModal: true,
  hasBackdrop: true,
  preventsScroll: true,
  trapsKeyboardFocus: true,
  hidesOnEsc: true,
  handlesUserInteraction: true,
  handlesAccessibility: true,
  globalPlacement: 'center-middle',
}
```

#### Tooltip
```js
{
  isTooltip: true,
  handlesUserInteraction: true,
  handlesAccessibility: true,
}
```

#### Popover
```js
{
  handlesUserInteraction: true,
  handlesAccessibility: true,
}
```
#### Dropdown
```js
{
  placement: 'bottom',
  handlesUserInteraction: true,
  handlesAccessibility: true,
}
```
#### Toast
```js
{
  ...Dialog,
  globalPlacement: 'top-right', (?)
}
```
#### Sheet (bottom, top, left, right)
```js
{
  ...Dialog,
  globalPlacement: '{top|bottom|left|right}-fullwidth', (?)
}
```
#### Select
No need for cfg, will probably invoke ResponsiveOverlayCtrl and switches
config based on media query from Dropdown to BottomSheet/CenteredDialog

#### Combobox/autocomplete
No need for cfg, will probably invoke ResponsiveOverlayCtrl and switches
config based on media query from Dropdown to BottomSheet/CenteredDialog

#### Application menu
No need for cfg, will probably invoke ResponsiveOverlayCtrl and switches
config based on media query from Dropdown to BottomSheet/CenteredDialog


## Web components
Web components provide a declarative, developer friendly interface with a preconfigured styling
that fits the Design System and makes it really easy for Application Developers to build
user interfaces.
The ground layers for the webcomponents in Lion are the following:

#### Dialog

Imperative might be better here? We can add a web component later if needed.

#### Tooltip
```html
<lion-tooltip>
  <button slot="invoker">hover me</button>
  This will be shown
</lion-tooltip>
```
#### Popover
```html
<lion-popover>
  <button slot="invoker">
    interact with click/space/enter
  </button>
  This will be shown
</lion-popover>
```
#### Dropdown
Like the name suggests, the default placement will be button
```html
<lion-dropdown>
  <button slot="invoker">
    interact with click/space/enter
  </button>
  <ul>
    <li>This will be shown on hover</li>
  </ul>
</lion-dropdown>
```
#### Toast

Imperative might be better here?
- Sheet (bottom, top, left, right)

Imperative might be better here?


### Web components implementing generic overlays

#### Select, Combobox/autocomplete, Application menu

Those will be separate web components with a lot of form and a11y logic that will be described
in detail in different sections.
They will implement the Overlay configuration as described above under 'Controllers/behaviors'.
