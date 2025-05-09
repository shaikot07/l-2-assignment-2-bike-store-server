import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { TUser } from './user.interface';

const blockUserByAdmin = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found !');
  }

  if (user.role === 'admin') {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you can not block admin ');
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'user al ready block ');
  }

  user.isBlocked = true;
  const result = await user.save();

  return result;
};

 const getAllUserFromDb = async () => {

  const result = await User.find()

  return result;
};

const updatedUserPersonalInfoById= async (userId: string, updatedUserData: { name: string; role: string; profileImg: string }): Promise<TUser | null> => {

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found !');
  }
 const result = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
      runValidators: true, // optional but helps
    });
    return result;

}
const getUserById=async(userId:string):Promise<TUser | null>=>{
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found !');
  }
  return user;
}

export const userServices = {
    blockUserByAdmin,
    getAllUserFromDb,
    updatedUserPersonalInfoById,
    getUserById
};
