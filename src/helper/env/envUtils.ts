export function requiredEnv(name: keyof NodeJS.ProcessEnv): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }
  return value;
}

export function optionalEnv(name: keyof NodeJS.ProcessEnv, fallback = ''): string {
  return process.env[name] ?? fallback;
}

export function boolEnv(name: keyof NodeJS.ProcessEnv, fallback = false): boolean {
  const val = process.env[name];
  if (val === undefined) return fallback;
  return /^(true|1|yes)$/i.test(val);
}