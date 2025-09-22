import express from "express"
import upload from "../middleware/multer"
import { isAuthenticated } from "../middleware/isAuthenticated"
import { addMenu, editMenu } from "../controller/menu.controller"

const router = express.Router()

router.route("/").post(isAuthenticated,upload.single("image"),addMenu)
router.route("/:id").put(isAuthenticated,upload.single("image"),editMenu)

export default router 