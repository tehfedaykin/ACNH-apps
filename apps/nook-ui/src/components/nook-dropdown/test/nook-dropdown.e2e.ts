import { newE2EPage } from '@stencil/core/testing';

describe('nook-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nook-dropdown></nook-dropdown>');

    const element = await page.find('nook-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
