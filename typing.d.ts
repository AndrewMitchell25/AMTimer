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
  single: string;
  ao5: string;
  ao12: string;
  ao50: string;
  ao100: string;
  cube: string;
};

type UserData = {
  dateCreated: FieldValue;
  displayName: string;
  pbs: {};
  totalSolves: number;
};

type AuthContextType = {
  currentUser: User | null;
  currentUserData: UserData | null;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void> | undefined;
  updateUserPassword: (password: string) => Promise<void> | undefined;
  updateUserDisplayName: (newDisplayName: string) => Promise<void> | undefined;
};
