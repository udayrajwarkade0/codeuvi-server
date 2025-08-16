const express = require("express");
const adminController= require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware")
const adminmiddileware = require("../middleware/admin-middleware")

const router = express.Router();

router.route("/users").get(authMiddleware,adminmiddileware,adminController.getAllUsers);
router.route("/users/:id").get(authMiddleware,adminmiddileware,adminController.getAUserById);
router.route("/users/:id").get(authMiddleware,adminmiddileware,adminController.getAUserById);
router.route("/users/update/:id").patch(authMiddleware,adminmiddileware,adminController.updateUserById);



router.route("/users/delete/:id").delete(authMiddleware,adminmiddileware,adminController.deleteUserById);

router.route("/contacts").get(authMiddleware, adminmiddileware, adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware, adminmiddileware, adminController.deleteContactById);


router.route("/services")
  .get(authMiddleware, adminmiddileware, adminController.getAllServices)
  .post(authMiddleware, adminmiddileware, adminController.addService);

router.route("/services/delete/:id")
  .delete(authMiddleware, adminmiddileware, adminController.deleteServiceById);



module.exports = router;
