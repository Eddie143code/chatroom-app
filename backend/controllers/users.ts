import { User } from "../models/users";
//import { sequelize } from "../util/db";

const userCreate = async (req: any, res: any) => {
  const { name } = req.body;
  const nameExists = await User.findOne({ where: { name: name } });
  if (nameExists) {
    return res.json(nameExists);
  }
  const user = await User.create({
    name: String(name),
  });
  return res.json(user);
};

const getCurrentUser = async (req: any, res: any) => {
  const { name } = req.body;
  const username = await User.findOne({
    name,
  });
  return res.json(username);
};

export { userCreate, getCurrentUser };
