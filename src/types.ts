export interface IBadWord {
  id: number;
  word: string;
}

export interface IMessage {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  topicId: number;
  authorId: number;
}

export interface IRubric {
  id: number;
  name: string;
  description: string;
}

export interface ITopic {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  rubricId: number;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  registrationDate: string;
  messagesCount: number;
}
