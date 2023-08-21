export enum DocumentTypes {
  STATEMENT = 'افاده',
  LEASE_REGISTRATION = 'تسجيل عقد إيجار',
  RENTAL_FEES_DISABLED_EXEMPTION = 'طلب إعفاء معوق من رسوم التأجيرية',
  MUNICIPAL_FEES_INSTALLMENT = 'تقسيط رسوم بلدية',
  MUNICIPAL_CLEARANCE = 'طلب براءة ذمة بلدية ',
  BUILDING_PERMIT = 'طلب ترخيص بالبناء ',
  BUILDING_PERMIT_RENEWAL = 'طلب تجديد ترخيص بالبناء ',
}

export interface IDocumentRequest {
  _id: string;
  type: DocumentTypes;
  callee: string; // المستدعي
  address: string;
  phoneNumber: string;
  propertyNo: string; // عقار رقم
  sectionNo: string;
  realEstateArea: string; // منطقة عقارية
  requestFor: string;
  attachedDocuments: number[]; // ! not sure how this will be handled
  notes: string;
  status: string;
}
