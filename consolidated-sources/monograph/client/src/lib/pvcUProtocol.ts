import { z } from 'zod';

/**
 * PROTOCOLO PVC-U Ω-MAX // MÓDULO FRONTEND
 * Capas de validación estructural, semántica, trazabilidad y envelopes.
 */

export const AgentCommandSchema = z.object({
  callSign: z.string().min(3, { message: 'PVC-101: Callsign demasiado corto (mínimo 3 caracteres)' }).max(32),
  sector: z.enum(['GENESIS', 'JUDAS', 'OMEGA'], { message: 'PVC-102: Sector estelar inválido' }),
  clearanceLevel: z.number().int().min(1).max(12),
  payloadHash: z.string().regex(/^0x[a-fA-F0-9]{16}$/, { message: 'PVC-103: Hash de integridad inválido (debe ser formato 0x hexadecimal de 16 chars)' }),
});

export type AgentCommandInput = z.infer<typeof AgentCommandSchema>;

export interface ValidationEnvelope<T> {
  validationStatus: 'PASSED' | 'FAILED';
  layer: string;
  traceId: string;
  validationId: string;
  timestamp: string;
  data?: T;
  errors?: Array<{ code: string; message: string; sphere: number }>;
}

export function validateAgentCommand(input: unknown): ValidationEnvelope<AgentCommandInput> {
  const traceId = `trace-${Math.random().toString(36).substring(2, 10)}`;
  const validationId = `val-${Math.random().toString(36).substring(2, 10)}`;
  const timestamp = new Date().toISOString();

  const result = AgentCommandSchema.safeParse(input);

  if (!result.success) {
    return {
      validationStatus: 'FAILED',
      layer: 'SPHERE_1_STRUCTURAL',
      traceId,
      validationId,
      timestamp,
      errors: result.error.issues.map((err: z.ZodIssue) => ({
        code: String(err.message).split(':')[0] || 'PVC-100',
        message: String(err.message),
        sphere: 1,
      })),
    };
  }

  // Domain rule check (Sphere 2)
  if (result.data.sector === 'OMEGA' && result.data.clearanceLevel < 10) {
    return {
      validationStatus: 'FAILED',
      layer: 'SPHERE_2_SEMANTIC',
      traceId,
      validationId,
      timestamp,
      errors: [
        {
          code: 'PVC-201',
          message: 'Violación de invariante: Sector OMEGA requiere clearance level >= 10',
          sphere: 2,
        },
      ],
    };
  }

  return {
    validationStatus: 'PASSED',
    layer: 'SPHERE_6_INTEGRITY',
    traceId,
    validationId,
    timestamp,
    data: result.data,
  };
}
