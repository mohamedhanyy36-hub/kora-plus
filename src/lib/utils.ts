import { redirect } from 'next/navigation';

export function getStatusLabel(status: string) {
  const labelMap: Record<string, string> = {
    upcoming: 'قادم',
    live: 'مباشر',
    finished: 'منتهي'
  };

  return labelMap[status] ?? 'غير محدد';
}

export function safeDate(value?: string | null) {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleString('ar-SA', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

export function castMatchStatus(value: FormDataEntryValue | null | undefined) {
  const status = String(value ?? 'upcoming');
  if (['upcoming', 'live', 'finished'].includes(status)) {
    return status;
  }
  return 'upcoming';
}

export function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
