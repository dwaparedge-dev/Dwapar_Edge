// Shared rules for the "Book a demo" form. The browser checks them for quick feedback; the server route checks them again.

export const normalizeMobile = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
};

export type DemoFields = { name: string; company: string; mobile: string; email: string };
export type DemoErrors = Partial<Record<keyof DemoFields, string>>;

/** Returns the cleaned fields, or the first problem per field. */
export function checkDemoFields(input: Record<string, unknown>): { ok: true; value: DemoFields } | { ok: false; errors: DemoErrors } {
  const text = (v: unknown) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim() : "");
  const value: DemoFields = {
    name: text(input.name),
    company: text(input.company),
    mobile: normalizeMobile(typeof input.mobile === "string" ? input.mobile : ""),
    email: text(input.email).toLowerCase(),
  };
  const errors: DemoErrors = {};
  if (!value.name) errors.name = "Name is required";
  else if (value.name.length > 120) errors.name = "Name can be at most 120 characters";
  if (!value.company) errors.company = "Company is required";
  else if (value.company.length > 200) errors.company = "Company can be at most 200 characters";
  if (!/^[6-9]\d{9}$/.test(value.mobile)) errors.mobile = "Enter a valid 10-digit mobile number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) || value.email.length > 254) errors.email = "Enter a valid email address";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}
