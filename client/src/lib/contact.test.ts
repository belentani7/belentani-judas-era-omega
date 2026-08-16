import { describe, expect, it } from 'vitest';
import { buildContactMailto } from './contact';

describe('buildContactMailto', () => {
  it('encodes the artist contact payload for a mail client handoff', () => {
    const mailto = buildContactMailto({
      name: 'Ana & Luz',
      email: 'ana@example.com',
      message: 'Quiero entrar a Judas Era.',
    });

    expect(mailto).toContain('mailto:hello@belentani.com?');
    expect(mailto).toContain(encodeURIComponent('BELENTANI // Judas Era signal from Ana & Luz'));
    expect(mailto).toContain(encodeURIComponent('Name: Ana & Luz\nEmail: ana@example.com\n\nQuiero entrar a Judas Era.'));
  });
});
