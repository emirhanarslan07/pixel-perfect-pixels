export type Order = { id: string; name: string; email: string; product: string; price: number; status: 'Ödendi' | 'Bekliyor' | 'İade edildi'; date: string; source: string };
export const orders: Order[] = [
 { id: 'SY-1048', name: 'Zeynep Kaya', email: 'zeynep@example.com', product: 'Instagram Büyüme Rehberi', price: 249, status: 'Ödendi', date: '9 Eki 2026, 11:42', source: 'Instagram' },
 { id: 'SY-1047', name: 'Mert Demir', email: 'mert@example.com', product: '1:1 Strateji Görüşmesi', price: 1490, status: 'Ödendi', date: '9 Eki 2026, 10:18', source: 'Instagram' },
 { id: 'SY-1046', name: 'Elif Şahin', email: 'elif@example.com', product: 'Reels Şablon Paketi', price: 399, status: 'Bekliyor', date: '9 Eki 2026, 09:56', source: 'TikTok' },
 { id: 'SY-1045', name: 'Can Arslan', email: 'can@example.com', product: 'Instagram Büyüme Rehberi', price: 249, status: 'Ödendi', date: '8 Eki 2026, 18:30', source: 'YouTube' },
 { id: 'SY-1044', name: 'Selin Aydın', email: 'selin@example.com', product: 'Reels Şablon Paketi', price: 399, status: 'Ödendi', date: '8 Eki 2026, 16:12', source: 'Instagram' },
 { id: 'SY-1043', name: 'Deniz Yıldız', email: 'deniz@example.com', product: '1:1 Strateji Görüşmesi', price: 1490, status: 'İade edildi', date: '7 Eki 2026, 14:05', source: 'Doğrudan' },
 { id: 'SY-1042', name: 'Zeynep Kaya', email: 'zeynep@example.com', product: 'Reels Şablon Paketi', price: 399, status: 'Ödendi', date: '6 Eki 2026, 12:40', source: 'Instagram' },
 { id: 'SY-1041', name: 'Ece Yalçın', email: 'ece@example.com', product: 'Instagram Büyüme Rehberi', price: 249, status: 'Ödendi', date: '5 Eki 2026, 09:22', source: 'TikTok' },
];
export const customers = Array.from(new Set(orders.map(o => o.email))).map(email => {
 const related = orders.filter(o => o.email === email); const first = related[0];
 return { email, name: first?.name ?? '', orders: related.length, spent: related.filter(o => o.status === 'Ödendi').reduce((sum,o) => sum+o.price,0), last: first?.date ?? '', source: first?.source ?? '' };
});
export function exportCSV(name: string, rows: string[][]) {
 const content = '\uFEFF' + rows.map(row => row.map(v => '"' + v.replaceAll('"', '""') + '"').join(';')).join('\n');
 const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8;' }));
 const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${name}.csv`; anchor.click(); URL.revokeObjectURL(url);
}
export function initials(name: string) { return name.split(' ').map(p => p[0]).slice(0,2).join(''); }
