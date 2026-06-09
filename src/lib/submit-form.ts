// Helper to send any site form's data to the admin dashboard (submissions inbox).
export async function submitForm(formType: string, data: Record<string, any>): Promise<boolean> {
  try {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form_type: formType, data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
