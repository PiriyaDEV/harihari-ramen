const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../../../public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.singleImage = (req, res) => {
  upload.single("image")(req, res, () => {
    res.send("Uploaded");
  });
};
