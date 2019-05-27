# LocalOverlayController

This is a base class for different local overlays (e.g. a [tooltip](../../tooltip/), see [Overlay Occurrences](./OverlayOccurrences.md) - the ones positioned next to invokers they are related to.
You should not use this controller directly unless you want to create a unique type of local overlays which is not supported out of the box.

All supported types of local overlays are described below.

## How to use

### Installation
```sh
npm i --save @lion/overlays
```

### Example
```js
import { overlays } from '@lion/overlays';

const myCtrl = overlays.add(
  new LocalOverlayController({
    /* options */
  })
);
```


This is currently WIP.
Stay tuned for updates on new types of overlays.
