const multer = require("multer");

const public = __dirname + "../../../public";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "menu") {
      cb(null, public + "/menus");
    } else if (file.fieldname === "choice") {
      cb(null, public + "/choices");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.singleImage = (req, res, next) => {
  const type = [
    { name: "menu", maxCount: 1 },
    { name: "choice", maxCount: 1 },
  ];

  upload.fields(type)(req, res, () => {
    if (req.body.info) {
      const file = req.files;

      req.body = JSON.parse(req.body.info);

      if (file.menu) {
        req.body.image_url = "/images/menus/" + file.menu[0].filename;
      } else if (file.choice) {
        req.body.image_url = "/images/choices/" + file.choice[0].filename;
      }
      next();
    } else {
      return res.status(500).json({
        success: false,
        message: "Information required",
      });
    }
  });
};
