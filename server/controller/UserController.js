import User from "../models/User.js";
export const searchUser = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const searchedResult = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(searchedResult);
  } catch (error) {
    console.log(error);
  }
};

//featching all users

export const fetchUsers = async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).send("Unauthorized");
    }
    const allUsers = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
  }
};
export const fetchSingleUsers = async (req, res) => {
    const { userId} = req.body;
  try {
    if (!req.user) {
      res.status(400).send("Unauthorized");
    }
    
    if (userId) {
      const user = await User.findById({ _id: userId }).select("-password");
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchCurrentUsers = async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).send("Unauthorized");
    }    
   
      const user = await User.findById({ _id: req.user._id}).select("-password");
      res.status(200).json(user);

  } catch (error) {
    console.log(error);
  }
};
