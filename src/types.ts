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
  callee: IUser; // المستدعي
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

export interface IName {
  firstName: string;
  fatherName?: string;
  motherName?: string;
  lastName: string;
}

export interface IPersonalInfo {
  sect: string;
}

export interface IRecordInfo {
  sect: string;
  number: number;
}

export interface IUser {
  _id: string;
  password: string;
  name: IName;
  phoneNumberList: [string];
  email: string;
  role: string[];
  refreshToken?: string;
  personalInfo: IPersonalInfo;
  sex: string;
  recordInfo: IRecordInfo;
  dateOfBirth: Date;
}
