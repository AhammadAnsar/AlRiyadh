import { HealthCertificate, PresetOption } from '../types';

export const GENDER_PRESETS: PresetOption[] = [
  { enLabel: 'Male', arValue: 'ذكر' },
  { enLabel: 'Female', arValue: 'أنثى' },
];

export const NATIONALITY_PRESETS: PresetOption[] = [
  { enLabel: 'Bangladesh', arValue: 'بنجلاديش' },
  { enLabel: 'India', arValue: 'الهند' },
  { enLabel: 'Pakistan', arValue: 'باكستان' },
  { enLabel: 'Egypt', arValue: 'مصر' },
  { enLabel: 'Nepal', arValue: 'نيبال' },
  { enLabel: 'Philippines', arValue: 'الفلبين' },
  { enLabel: 'Yemen', arValue: 'اليمن' },
  { enLabel: 'Syria', arValue: 'سوريا' },
  { enLabel: 'Sudan', arValue: 'السودان' },
  { enLabel: 'Saudi Arabia', arValue: 'المملكة العربية السعودية' },
  { enLabel: 'Jordan', arValue: 'الأردن' },
  { enLabel: 'Sri Lanka', arValue: 'سريلانكا' },
];

export const PROFESSION_PRESETS: PresetOption[] = [
  { enLabel: 'Sales Representative', arValue: 'مندوب مبيعات' },
  { enLabel: 'Worker / Laborer', arValue: 'عامل' },
  { enLabel: 'Cook / Chef', arValue: 'طباخ' },
  { enLabel: 'Waiter / Food Server', arValue: 'مقدم طعام' },
  { enLabel: 'Barber / Hairdresser', arValue: 'حلاق' },
  { enLabel: 'Driver', arValue: 'سائق' },
  { enLabel: 'Food Preparer', arValue: 'محضر أطعمة' },
  { enLabel: 'Cashier', arValue: 'محاسب' },
  { enLabel: 'Baker', arValue: 'خباز' },
  { enLabel: 'Butcher', arValue: 'قصاب' },
  { enLabel: 'Cleaner / Janitor', arValue: 'عامل نظافة' },
];

export const PLACE_OF_ISSUE_PRESETS: PresetOption[] = [
  { enLabel: 'Riyadh Region Municipality', arValue: 'أمانة منطقة الرياض' },
  { enLabel: 'Al-Kharj Municipality', arValue: 'بلدية محافظة الخرج' },
  { enLabel: 'Ad-Diriyah Municipality', arValue: 'بلدية محافظة الدرعية' },
  { enLabel: 'Al-Majmaah Municipality', arValue: 'بلدية محافظة المجمعة' },
  { enLabel: 'Dawadmi Municipality', arValue: 'بلدية محافظة الدوادمي' },
];

// Clean, realistic portrait photo data for the default certificate
export const DEFAULT_PORTRAIT_PHOTO = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=480&q=80';

export const SAMPLE_PHOTOS = [
  {
    label: 'Professional Man (Passport Style)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=480&q=80',
  },
  {
    label: 'Formal Portrait 1',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=480&q=80',
  },
  {
    label: 'Formal Portrait 2',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=480&q=80',
  },
  {
    label: 'Formal Portrait 3',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=480&q=80',
  },
];

export const DEFAULT_CERTIFICATE: HealthCertificate = {
  id: '239572-1448',
  certificateNumber: '239572/1448',
  placeOfIssue: 'أمانة منطقة الرياض',
  expiryDate: '22/04/1449',
  fullName: 'ABDULMOTALEBBNUR UZZAMAN MIAH',
  nationalId: '2085415798',
  gender: 'ذكر',
  nationality: 'بنجلاديش',
  profession: 'مندوب مبيعات',
  photoUrl: DEFAULT_PORTRAIT_PHOTO,
  status: 'Published',
  createdAt: '2024-11-10T10:00:00Z',
  updatedAt: '2024-11-10T10:00:00Z',
};

export const INSTRUCTION_POINTS: string[] = [
  '* حامل هذه الشهادة حاصل على تقرير طبي يثبت خلوه من الأمراض المعدية وأجريت له التحصينات تخوله للعمل في محلات الأغذية والصحة العامة',
  '* تشغيل عمال ليس لديهم شهادات صحية أو لديهم شهادات صحية منتهية يعاقب عليها النظام بغرامة مالية عن كل عامل',
  '* تجدد هذه الشهادة قبل انتهائها بثلاثين يوماً',
  '* لا تعتبر هذه الشهادة اثبات هوية لحاملها',
  '* للتأكد من سلامة الشهادة يرجى زيارة موقع أمانة منطقة الرياض',
];
