export const SECTS = {
  ARMENIAN_ORTHODOX: 'ارمن ارثوذكس',
  ARMENIAN_PROTESTANT: 'ارمن بروتستانت',
  ARMENIAN_CATHOLIC: 'ارمن كاثوليك',
  ASSYRIAN: 'اشوري',
  EVANGELICAL: 'انجيلي (بروتستانت)',
  ROMAN_ORTHODOX: 'روم ارثوذكس',
  ROMAN_CATHOLIC: 'روم كاثوليك',
  SYRIAC_CATHOLIC: 'سريان كاثوليك',
  SYRIAC_ORTHODOX: 'سريان ارثوذكس',
  JEHOVAH_WITNESS: 'شهود يهوه',
  COPTIC: 'قبطي',
  COPTIC_ORTHODOX: 'قبطي ارثوذكس',
  COPTIC_CATHOLIC: 'قبطي كاثوليك',
  CHALDEAN: 'كلدان',
  CHALDEAN_ORTHODOX: 'كلدان ارثوذكس',
  CHALDEAN_CATHOLIC: 'كلدان كاثوليك',
  LATIN: 'لاتيني',
  MARONITE: 'ماروني',
  CHRISTIAN: 'مسيحي',
  NESTORIAN: 'نسطوري',
  ISMAILI: 'اسماعيليي',
  DRUZE: 'درزي',
  SUNNI: 'سني',
  SHIITE: 'شيعي',
  ALAWITE: 'علوي',
  ISRAELI: 'اسرائيلي',
  BAHAI: 'بهائي',
  BUDDHIST: 'بوذي',
  HINDU: 'هندوسي',
  UNSPECIFIED: 'غير مذكور',
  OTHER: 'مختلف',
  TO_CHECK: 'للتدقيق',
  NON_SECTARIAN: 'لا طائفي',
};

export const SEXES = { MALE: 'ذكر', FEMALE: 'أنثى' };

export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@!%]).{8,24}/;
