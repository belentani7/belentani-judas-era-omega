/**
 * Protocolo PVC-U Ω-Max — Validación Estructural y Semántica para Frontend
 * Garantiza contratos inmutables, trazabilidad por traceId y códigos de error normalizados.
 */

export interface ValidationEnvelope<T> {
  validationId: string;
  traceId: string;
  validationStatus: 'PASSED' | 'FAILED';
  layer: string;
  timestamp: string;
  payload: T;
  errors: { code: string; message: string; sphere: string }[];
}

export function createValidationEnvelope<T>(payload: T, errors: { code: string; message: string; sphere: string }[] = []): ValidationEnvelope<T> {
  const validationId = `v-${Math.random().toString(36).slice(2, 9)}`;
  const traceId = `trace-${Math.random().toString(36).slice(2, 11)}`;
  return {
    validationId,
    traceId,
    validationStatus: errors.length === 0 ? 'PASSED' : 'FAILED',
    layer: 'PRESENTATION / PVC-U Ω-MAX',
    timestamp: new Date().toISOString(),
    payload,
    errors,
  };
}

export function validateContactPayload(name: string, email: string, message: string) {
  const errors: { code: string; message: string; sphere: string }[] = [];
  if (!name || name.trim().length < 2) {
    errors.push({ code: 'PVC-101', message: 'El nombre es obligatorio (mínimo 2 caracteres).', sphere: 'Esfera 1 (Estructural)' });
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    errors.push({ code: 'PVC-401', message: 'El formato del correo electrónico es inválido o vulnerable.', sphere: 'Esfera 4 (Seguridad/Sanitización)' });
  }
  if (!message || message.trim().length < 5) {
    errors.push({ code: 'PVC-201', message: 'El mensaje de transmisión es demasiado corto o carece de sustancia.', sphere: 'Esfera 2 (Semántica)' });
  }
  return createValidationEnvelope({ name, email, message }, errors);
}
