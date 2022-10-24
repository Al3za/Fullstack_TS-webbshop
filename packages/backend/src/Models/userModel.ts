import { model, Schema, connect } from "mongoose";
import { user_interface } from "@webbshop-app/shared";
const bcrypt = require("bcrypt");

const userModel = new Schema({
  username: { type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true },
  phoneNr: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
});

export const setUpMongoDb = async (url: string): Promise<void> => {
  await connect(url);
};

userModel.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

export const checkUser = async (
  user: user_interface
): Promise<user_interface | null> => {
  const findUser = await User.findOne({ username: user.username });
  if (findUser && (await bcrypt.compare(user.password, findUser.password))) {
    return findUser;
  } else {
    throw new Error();
  }
};

export const User = model<user_interface>("user", userModel);

export const saveUser = async (item: user_interface): Promise<void> => {
  const NewUser = new User(item);
  const SaveNewUser = await NewUser.save();
  if (!SaveNewUser) {
    throw new Error("ange giltig data");
  }
};
export const uppdateUser = async (update: user_interface) => {
  const { _id, mail, address, password, phoneNr, username } = update;
  const hashadPassword = await bcrypt.hash(password, 10);
  console.log(update);
  const bodyUpdate = await User.updateOne(
    { _id: _id },
    {
      username: username,
      mail: mail,
      address: address,
      phoneNr: phoneNr,
      password: hashadPassword,
    }
  );
  console.log(bodyUpdate);
  if (!bodyUpdate) {
    throw new Error();
  }

  //const findId = await User.updateOne({});
};
