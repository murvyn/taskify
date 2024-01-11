import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  fileKey: string;
}

export interface LoginUserProps {
  email: string;
  password: string;
}

export interface TaskProps {
  title: string;
  description: string;
  dateTime: Date;
  _id: string;
  complete: boolean;
  important: boolean;
}

export interface ChildrenProps {
  children: ReactNode;
}

export interface ToggleProps {
  toggleCard: () => void;
}


export interface TaskContextProps {
  tasks?: TaskProps[];
  setTasks: Dispatch<SetStateAction<TaskProps[]>>;
  setImportantCount: Dispatch<SetStateAction<number>>;
  setCompletedCount: Dispatch<SetStateAction<number>>;
  setAllTaskCount: Dispatch<SetStateAction<number>>;
  setTodayCount: Dispatch<SetStateAction<number>>;
  importantCount: number
  completedCount: number
  allTaskCount: number
  todayCount: number
}


export interface UserContextProps {
  user?: IUser;
  loading?: boolean;
  setUser: (value: IUser) => void;
  setLoading: (value: boolean) => void;
}