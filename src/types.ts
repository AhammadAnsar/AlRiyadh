export interface HealthCertificate {
  id: string;
  certificateNumber: string; // e.g. "239572/1448"
  placeOfIssue: string; // e.g. "أمانة منطقة الرياض"
  expiryDate: string; // e.g. "22/04/1449"
  fullName: string; // e.g. "ABDULMOTALEBBNUR UZZAMAN MIAH"
  nationalId: string; // e.g. "2085415798"
  gender: string; // e.g. "ذكر"
  nationality: string; // e.g. "بنجلاديش"
  profession: string; // e.g. "مندوب مبيعات"
  photoUrl: string; // Base64 or image URL
  customLogoUrl?: string; // Optional custom emblem
  status: 'Published' | 'Draft';
  createdAt: string;
  updatedAt: string;
}

export interface PresetOption {
  enLabel: string;
  arValue: string;
}
