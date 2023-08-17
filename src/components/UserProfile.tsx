import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

export interface IUser {
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

function UserProfile() {
  // const [details, setDetails] = useState<IUser>();
  const { auth } = useContext(AuthContext);
  // useEffect(() => {
  //   getUserDetails
  // }, [])

  return <div>{auth.email}</div>;
}

export default UserProfile;
