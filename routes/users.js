const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
    allUsers,
    getUserDetails,
    deleteUser,
    updateUser,
    updateProfile,
    updatePassword
} = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)


router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router;