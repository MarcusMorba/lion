import { storiesOf, html } from '@open-wc/demoing-storybook';

import '../lion-input-amount.js';

storiesOf('Forms|Input Amount', module)
  .add(
    'Default',
    () => html`
      <lion-input-amount .errorValidators="${['required']}" label="Amount" .modelValue=${123456.78}>
      </lion-input-amount>
    `,
  )
  .add(
    'Set USD as currency',
    () => html`
      <lion-input-amount label="Price" currency="USD" .modelValue=${123456.78}> </lion-input-amount>
    `,
  )
  .add(
    'Set JOD as currency',
    () => html`
      <lion-input-amount label="Price" currency="JOD" .modelValue=${123456.78}> </lion-input-amount>
    `,
  )
  .add(
    'Force locale to nl-NL',
    () => html`
      <lion-input-amount
        .formatOptions="${{ locale: 'nl-NL' }}"
        label="Price"
        .modelValue=${123456.78}
        currency="JOD"
      >
      </lion-input-amount>
    `,
  )
  .add(
    'Force locale to en-US',
    () => html`
      <lion-input-amount
        .formatOptions="${{ locale: 'en-US' }}"
        label="Price"
        .modelValue=${123456.78}
        currency="YEN"
      >
      </lion-input-amount>
    `,
  )
  .add(
    'Faulty prefilled',
    () => html`
      <lion-input-amount
        label="Amount"
        help-text="Faulty prefilled input will be cleared"
        .modelValue=${'foo'}
      >
      </lion-input-amount>
    `,
  )
  .add(
    'Blocking non-digits',
    () => html`
      <lion-input-amount
        label="Amount"
        help-text="This will block the user from writing non-digits"
        .preprocessor=${v => v.replace(/[^0-9,. ]/g, '')}
      ></lion-input-amount>
    `,
  );
