import { User } from "../models/users";

const userCreate = async ({ name }: any) => {
  const user = await User.create({
    name: JSON.stringify(name),
  });
  return user;
};

const getCurrentUser = async ({ user }: any) => {
  const username = await User.findAll();
  console.log(user);
  const userReturn = username.find((User: any) => {
    return User.dataValues.name === user;
  });

  return userReturn;
};

export { userCreate, getCurrentUser };
