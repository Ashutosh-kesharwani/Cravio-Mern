# TODO

> FOOD COntroller
> Order sonrtoller
> cart controller

> ADMIN
> Setuseractive/inactive

> updateOrderStatus

> And other ....

---

# File upload handling

You're thinking in the right direction. **Don't hardcode image validation into the global Multer instance.** Since you'll later upload **images, videos, PDFs, resumes, etc.**, keep Multer generic and create **reusable upload middlewares**.

A production structure looks like this:

```text
middlewares/
├── multer.middleware.js          // storage only
├── uploadAvatar.middleware.js    // avatar rules
├── uploadVideo.middleware.js     // video rules
├── uploadResume.middleware.js    // pdf/doc rules
```

### 1. Keep `multer.middleware.js` generic

```js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/temp"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export default storage;
```

Notice we're exporting **storage**, not an upload instance.

---

### 2. Avatar upload

```js
import multer from "multer";
import storage from "./multer.middleware.js";
import ApiError from "../utils/ApiError.js";

const avatarUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new ApiError(400, "Only image files are allowed."));
    }

    cb(null, true);
  },
});

export default avatarUpload;
```

Usage:

```js
avatarUpload.single("avatar");
```

---

### 3. Video upload

```js
const videoUpload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("video/")) {
      return cb(new ApiError(400, "Only video files are allowed."));
    }

    cb(null, true);
  },
});
```

---

### 4. Resume upload

```js
const resumeUpload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new ApiError(400, "Only PDF or DOC files are allowed."));
    }

    cb(null, true);
  },
});
```

---

## Why this is better

Your storage logic stays in one place, while **each upload type has its own validation rules**.

```text
Storage
   │
   ├── Avatar Upload
   │      ├── Images only
   │      └── Max 5 MB
   │
   ├── Video Upload
   │      ├── Videos only
   │      └── Max 100 MB
   │
   └── Resume Upload
          ├── PDF/DOC only
          └── Max 2 MB
```

This approach scales well as your project grows and is commonly used in production applications.

For a scalable production project, I'd use:

```text
src/
├── middlewares/
│   ├── multer.middleware.js          // Shared storage configuration
│   ├── avatarUpload.middleware.js    // Avatar upload (5MB, images only)
│   ├── coverImageUpload.middleware.js// Cover image upload (images only)
│   ├── videoUpload.middleware.js     // Video upload
│   ├── documentUpload.middleware.js  // PDF/DOC upload
│   └── multerError.middleware.js     // Multer error handler
```

Or, if you expect many upload types in the future, an even cleaner structure:

```text
src/
├── middlewares/
│   ├── multer/
│   │   ├── storage.js
│   │   ├── avatarUpload.js
│   │   ├── coverImageUpload.js
│   │   ├── videoUpload.js
│   │   ├── documentUpload.js
│   │   └── multerError.js
```

**I recommend the second structure** because it keeps all upload-related middleware together and scales better as your project grows.

# BUT FOR SINGLE FILE UPLOAD

src/
└── middlewares/
└── multer/
├── storage.js
├── imageUpload.js
└── multerError.js

Yes. This is a clean, scalable production structure for image uploads.

## Folder Structure

```text
src/
└── middlewares/
    └── multer/
        ├── storage.js
        ├── imageUpload.js
        └── multerError.js
```

---

## storage.js

```js
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.resolve("public/temp");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export default storage;
```

---

## imageUpload.js

```js
import multer from "multer";
import storage from "./storage.js";
import ApiError from "../../utils/ApiError.js";

const imageUpload = ({ maxSizeMB = 5 } = {}) => {
  return multer({
    storage,

    limits: {
      fileSize: maxSizeMB * 1024 * 1024,
    },

    fileFilter(req, file, cb) {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new ApiError(400, "Only image files are allowed."));
      }

      cb(null, true);
    },
  });
};

export default imageUpload;
```

---

## multerError.js

```js
import multer from "multer";
import ApiError from "../../utils/ApiError.js";

const multerError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return next(
          new ApiError(400, "Image size must not exceed the allowed limit.")
        );

      case "LIMIT_FILE_COUNT":
        return next(new ApiError(400, "Too many files uploaded."));

      case "LIMIT_UNEXPECTED_FILE":
        return next(new ApiError(400, "Unexpected file field."));

      default:
        return next(new ApiError(400, err.message));
    }
  }

  next(err);
};

export default multerError;
```

---

## Usage Examples

### Avatar

```js
import imageUpload from "../middlewares/multer/imageUpload.js";

router.patch(
  "/avatar",
  verifyJWT,
  imageUpload({ maxSizeMB: 5 }).single("avatar"),
  updateAvatar
);
```

---

### Cover Image

```js
router.patch(
  "/cover-image",
  verifyJWT,
  imageUpload({ maxSizeMB: 10 }).single("coverImage"),
  updateCoverImage
);
```

---

### Food Images

```js
router.post(
  "/foods",
  verifyJWT,
  imageUpload({ maxSizeMB: 3 }).array("images", 5),
  createFood
);
```

---

### Product Images

```js
router.post(
  "/products",
  verifyJWT,
  imageUpload({ maxSizeMB: 8 }).array("images", 10),
  createProduct
);
```

---

## Register the Multer Error Middleware

In your `app.js`, after all routes and before your global error handler:

```js
app.use(multerError);

app.use(errorHandler);
```

This keeps your upload configuration reusable while allowing each route to define its own image size and file count limits.

---

# NEW

---
