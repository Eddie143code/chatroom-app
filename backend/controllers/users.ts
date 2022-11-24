import { User } from "../models/users";
//import { sequelize } from "../util/db";

const userCreate = async ({ name }: any) => {
  console.log(typeof name);
  const user = await User.create({
    name: String(name),
  });
  return user;
};

const getCurrentUser = async (user: any) => {
  /*  const username = await sequelize.query(
    "SELECT * FROM users WHERE name = 'eddie'"
  ); */

  console.log(user);
  console.log();
  return;
};

export { userCreate, getCurrentUser };
