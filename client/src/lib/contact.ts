export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export function buildContactMailto({ name, email, message }: ContactPayload, recipient = 'hello@belentani.com') {
  const subject = encodeURIComponent(`BELENTANI // Judas Era signal from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
