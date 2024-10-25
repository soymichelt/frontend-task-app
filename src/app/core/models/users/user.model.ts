import { SuccessResultModel } from '../result/success-result.model';

export type UserType = {
  userId: string;
  displayName?: string;
  email: string;
};

export type UserResultModel = Omit<SuccessResultModel, 'body'> & {
  body: UserType;
};
