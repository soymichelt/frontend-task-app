import { SuccessResultModel } from '../result/success-result.model';
import { UserType } from './user.model';

export type UserRegisteredResultModel = Omit<SuccessResultModel, 'body'> & {
  body: UserType & {
    token: string;
  };
};
