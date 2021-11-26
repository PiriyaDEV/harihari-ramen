const multer = require("multer");

// path to public directory
const public = __dirname + "../../../public";

// config directory and file name to upload
const storage = multer.diskStorage({
  // set destination directory
  destination: function (req, file, cb) {
    // upload to menu directory
    if (file.fieldname === "menu") {
      cb(null, public + "/menus");
    }
    // upload to custom ramen choice directory
    else if (file.fieldname === "choice") {
      cb(null, public + "/choices");
    }
  },
  // set file name
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname.replace(/\s/g, "_"));
  },
});

// upload by multer
const upload = multer({ storage: storage });

// implement and upload incoming files
module.exports = (req, res, next) => {
  // set field name and limit maximum file to upload
  const type = [
    { name: "menu", maxCount: 1 },
    { name: "choice", maxCount: 1 },
  ];

  // call uploader
  upload.fields(type)(req, res, () => {
    // check if info exists
    if (req.body.info) {
      // uploaded file info
      const file = req.files;

      // save info to request body
      req.body = JSON.parse(req.body.info);

      // set file's url
      if (file.menu) {
        req.body.image_url = "/images/menus/" + file.menu[0].filename;
      } else if (file.choice) {
        req.body.image_url = "/images/choices/" + file.choice[0].filename;
      }

      // parse requests to next middleware
      next();
    }
    // if info does not exist
    else {
      return res.status(500).json({
        success: false,
        message: "Information required",
      });
    }
  });
};
