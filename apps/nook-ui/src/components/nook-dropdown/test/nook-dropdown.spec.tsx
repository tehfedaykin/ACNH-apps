import { newSpecPage } from '@stencil/core/testing';
import { NookDropdown } from '../nook-dropdown';

describe('nook-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NookDropdown],
      html: `<nook-dropdown></nook-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <nook-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nook-dropdown>
    `);
  });
});
