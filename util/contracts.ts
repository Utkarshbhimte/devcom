export interface UserData extends FirebaseFirestore.DocumentData {
  id?: string;
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  created?: number;
  updated?: number;
  works?: Work[];
}

export enum WorkType {
  project = "project",
  blog = "blog",
}
export interface Work extends FirebaseFirestore.DocumentData {
  id: string;
  created?: number;
  updated?: number;
  desc: string;
  type: WorkType;
  title: string;
  tags: string[];
  projectLink: string;
  codeLink: string;
  blogLink: string;
  owner: string;
  ownerData?: UserData;
}
export interface Comment extends FirebaseFirestore.DocumentData {
  id: string;
  created: string;
  owner: string;
  updated: string;
  text: string;
  workId: string;
}
