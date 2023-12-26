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
    completed: boolean;
    important: boolean;
  }