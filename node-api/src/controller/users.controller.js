const modelUser = require("../models/users");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebase.config");

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

const updateFotoProfile = async (req, res) => {
  const { id } = req.params;
  const foto = req.file;
  try {
    const [userData] = await modelUser.getUserByID(id);
    const found = userData[0];

    if (!found) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const { img_path } = found;
    if (img_path) {
      const filePath = img_path.split("/o/")[1].split("?")[0];
      const decodedPath = decodeURIComponent(filePath);

      const { firebaseStorage } = await firebaseConfig();
      const fileRef = ref(firebaseStorage, decodedPath);

      try {
        await deleteObject(fileRef);
      } catch (err) {
        console.error("Gagal menghapus gambar lama:", err.message);
        return res.status(500).json({
          message: "Gagal menghapus gambar lama.",
          error: err.message,
        });
      }
    }

    const profilePictURL = await uploadNewProfilePicture(foto);
    await pelamarModel.updateProfilePictPelamar(profilePictURL, idPelamar);

    res.status(200).json({
      message: "Profile berhasil diperbarui.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui profil perusahaan.",
      serverMessage: error.message,
    });
  }
};

module.exports = { getAllUser };
