const modelUser = require("../models/users");

const getAllUser = async (req, res) => {
  try {
    const [dataUser] = await modelUser.getAllUser();
    if (dataUser.length > 0) {
      res
        .status(200)
        .json({ message: "menampilkan semua data user", data: dataUser });
    } else {
        res.status(200).json({ message: "tidak ada data user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

module.exports = { getAllUser };
