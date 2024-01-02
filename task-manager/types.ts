import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
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

export interface TaskContextProps {
  tasks?: TaskProps[];
  setTasks: Dispatch<SetStateAction<TaskProps[]>>;
}


export interface UserContextProps {
  user?: IUser;
  loading?: boolean;
  setUser: (value: IUser) => void;
  setLoading: (value: boolean) => void;
}