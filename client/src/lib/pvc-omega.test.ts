import { describe, expect, it } from 'vitest';
import { validateContactPayload, createValidationEnvelope } from './pvc-omega';

describe('PVC-U Ω-Max Validation Engine', () => {
  it('passes valid contact payloads with a PASSED envelope', () => {
    const envelope = validateContactPayload('Belentani', 'belentani@judas.com', 'Activando protocolo Omega Core.');
    expect(envelope.validationStatus).toBe('PASSED');
    expect(envelope.errors).toHaveLength(0);
    expect(envelope.validationId).toBeDefined();
    expect(envelope.traceId).toBeDefined();
  });

  it('catches structural and semantic violations with PVC-U error codes', () => {
    const envelope = validateContactPayload('A', 'bad-email', 'Hi');
    expect(envelope.validationStatus).toBe('FAILED');
    expect(envelope.errors.length).toBeGreaterThan(0);
    expect(envelope.errors.some(e => e.code === 'PVC-101')).toBe(true);
    expect(envelope.errors.some(e => e.code === 'PVC-401')).toBe(true);
    expect(envelope.errors.some(e => e.code === 'PVC-201')).toBe(true);
  });
});
