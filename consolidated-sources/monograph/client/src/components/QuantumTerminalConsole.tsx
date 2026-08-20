import { useState } from 'react';
import { validateAgentCommand, ValidationEnvelope, AgentCommandInput } from '@/lib/pvcUProtocol';

export default function QuantumTerminalConsole() {
  const [callSign, setCallSign] = useState('AGENT-007');
  const [sector, setSector] = useState<'GENESIS' | 'JUDAS' | 'OMEGA'>('JUDAS');
  const [clearance, setClearance] = useState(8);
  const [hash, setHash] = useState('0x1234567890abcdef');
  const [envelope, setEnvelope] = useState<ValidationEnvelope<AgentCommandInput> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateAgentCommand({
      callSign,
      sector,
      clearanceLevel: Number(clearance),
      payloadHash: hash,
    });
    setEnvelope(result);
  };

  return (
    <div className="my-12 w-full max-w-4xl clip-corner border border-[rgba(255,0,60,0.4)] bg-[rgba(10,0,5,0.9)] p-8 backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,0,60,0.2)] pb-4 font-mono text-xs tracking-widest text-[#ffd700]">
        <span>[PVC-U Ω-MAX TERMINAL CONSOLE]</span>
        <span>SECURE GATEWAY</span>
      </div>

      <form onSubmit={handleSubmit} className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2 font-mono text-xs">
        <div>
          <label className="block mb-2 text-[rgba(255,255,255,0.7)]">CALL SIGN:</label>
          <input
            type="text"
            value={callSign}
            onChange={(e) => setCallSign(e.target.value)}
            className="w-full clip-corner border border-[rgba(255,0,60,0.3)] bg-black px-4 py-2 text-white focus:border-[#ff003c] focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-[rgba(255,255,255,0.7)]">SECTOR ESTELAR:</label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value as any)}
            className="w-full clip-corner border border-[rgba(255,0,60,0.3)] bg-black px-4 py-2 text-white focus:border-[#ff003c] focus:outline-none"
          >
            <option value="GENESIS">GENESIS</option>
            <option value="JUDAS">JUDAS</option>
            <option value="OMEGA">OMEGA (Requires Clearance &gt;= 10)</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-[rgba(255,255,255,0.7)]">CLEARANCE LEVEL (1-12):</label>
          <input
            type="number"
            value={clearance}
            onChange={(e) => setClearance(Number(e.target.value))}
            className="w-full clip-corner border border-[rgba(255,0,60,0.3)] bg-black px-4 py-2 text-white focus:border-[#ff003c] focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-[rgba(255,255,255,0.7)]">PAYLOAD HASH (0x...):</label>
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            className="w-full clip-corner border border-[rgba(255,0,60,0.3)] bg-black px-4 py-2 text-white focus:border-[#ff003c] focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full clip-corner bg-[#ff003c] py-3 font-mono text-xs uppercase tracking-widest text-white shadow-[0_0_20px_#ff003c] transition-all hover:bg-[#ff1a4d]"
          >
            Ejecutar Validación PVC-U Ω-Max
          </button>
        </div>
      </form>

      {envelope && (
        <div className={`mt-6 clip-corner border p-4 font-mono text-xs ${envelope.validationStatus === 'PASSED' ? 'border-[#ffd700] bg-[rgba(255,215,0,0.05)] text-[#ffd700]' : 'border-[#ff003c] bg-[rgba(255,0,60,0.05)] text-[#ff003c]'}`}>
          <p className="font-bold">STATUS: {envelope.validationStatus}</p>
          <p>LAYER: {envelope.layer}</p>
          <p>TRACE ID: {envelope.traceId}</p>
          <p>VALIDATION ID: {envelope.validationId}</p>
          <p>TIMESTAMP: {envelope.timestamp}</p>
          {envelope.errors && (
            <div className="mt-2">
              <p className="font-bold text-white">ERRORES DETECTADOS:</p>
              {envelope.errors.map((err, i) => (
                <p key={i}>[{err.code}] Sph {err.sphere}: {err.message}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
