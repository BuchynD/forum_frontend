export interface IEntity {
  id: number;
}

export interface IBadWord extends IEntity {
  id: number;
  word: string;
}

export interface IMessage extends IEntity {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  topicId: number;
  authorId: number;
}

export interface IRubric extends IEntity {
  id: number;
  name: string;
  description: string;
}

export interface ITopic extends IEntity {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  rubricId: number;
}

export interface IUser extends IEntity {
  id: number;
  username: string;
  email: string;
  registrationDate: string;
  messagesCount: number;
}
