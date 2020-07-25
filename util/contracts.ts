export interface UserData extends FirebaseFirestore.DocumentData {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
}

export enum WorkType {
  project = "project",
  blog = "blog",
}
export interface Work extends FirebaseFirestore.DocumentData {
  id: string;
  created: {
    _seconds: number;
    _nanoseconds: number;
  };
  desc: string;
  type: WorkType;
  title: string;
  tags: string[];
  projectLink: string;
  codeLink: string;
  owner: string;
  ownerData?: UserData;
}
