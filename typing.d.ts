type cube = {
  center: Int[];
  cp: Int[];
  co: Int[];
  ep: Int[];
  eo: Int[];
};

type time = {
  id: string;
  time: string;
  timestamp: FieldValue;
  scramble: string;
  ao5: string;
  ao12: string;
  ao50: string;
  ao100: string;
  plus2: boolean;
  dnf: boolean;
};

type sessionStats = {
  timestamp: any;
  single: statTime;
  ao5: statTime[];
  ao12: statTime[];
  ao50: statTime[];
  ao100: statTime[];
  cube: string;
};

type statTime = {
  id: string;
  time: string;
  timestamp: string;
  scramble: string;
  plus2: boolean;
  dnf: boolean;
};

type UserData = {
  dateCreated: FieldValue;
  displayName: string;
  pbs: {
    single: string;
    ao5: string;
    ao12: string;
    ao50: string;
    ao100: string;
  };
  totalSolves: number;
};

type AuthContextType = {
  currentUser: User | null;
  currentUserData: UserData | null;
  resetPassword: (email: string) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void> | undefined;
  updateUserPassword: (password: string) => Promise<void> | undefined;
  updateUserDisplayName: (newDisplayName: string) => Promise<void> | undefined;
};

declare module "*.png" {
  const path: string;
  export default path;
}
