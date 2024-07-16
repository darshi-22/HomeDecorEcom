import express from 'express'
import {registerController,
        loginController, 
        testController,
        forgotPasswordController,
        updateProfileController,
        getOrdersController,
        getAllOrdersController,
        orderStatusController} from '../controllers/authController.js'
import {requireSignIn,isAdmin} from '../middlewares/authMiddleware.js'
//Router object
const router=express.Router();

//Register
router.post('/register',registerController)

//Login
router.post('/login',loginController)

//Password
router.post('/forgot-password',forgotPasswordController)

//Test 
router.get("/test",requireSignIn,isAdmin,testController)

//Protected User routes
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})

//Admin private route
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})

//update profile
router.put('/profile',requireSignIn,updateProfileController)

//orders
router.get('/orders',requireSignIn,getOrdersController)

//orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

//order status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)

export default router