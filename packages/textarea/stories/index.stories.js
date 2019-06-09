import { storiesOf, html } from '@open-wc/demoing-storybook';

import '../lion-textarea.js';

storiesOf('Forms|Textarea', module)
  .add(
    'Default',
    () => html`
      <lion-textarea label="Default"></lion-textarea>
    `,
  )
  .add(
    'Prefilled',
    () => html`
      <p>Default "rows" is 2 and it will grow to a max of 6</p>
      <lion-textarea
        label="Prefilled"
        .modelValue=${['batman', 'and', 'robin'].join('\n')}
      ></lion-textarea>
    `,
  )
  .add(
    'Disabled',
    () => html`
      <lion-textarea label="Disabled" disabled></lion-textarea>
    `,
  )
  .add(
    'Stop Growing',
    () => html`
      <lion-textarea
        label="Stop Growing"
        max-rows="4"
        .modelValue=${['batman', 'and', 'robin'].join('\n')}
      ></lion-textarea>
    `,
  )
  .add(
    'Non Growing',
    () => html`
      <p>To have a fixed size provide rows and maxRows with the same value</p>
      <lion-textarea label="Non Growing" rows="3" max-rows="3"></lion-textarea>
    `,
  )
  .add(
    'Blocked after exceeding maximum characters',
    () => html`
      <lion-textarea
        label="Maximum 200 characters"
        help-text="Blocks you from inputting more than the maximum"
        .preprocessor=${v => v.substring(0, 200)}
      ></lion-textarea>
    `,
  );
