const express = require('express')
const { getSalesData,postSalesData,patchSalesData,deleteSalesData,getSalesDataById } = require('../apiControllers/api.controller')

const router =express.Router()

router.get('/getData',getSalesData)
router.get('/getData/:id',getSalesDataById)
router.post('/addData',postSalesData)
router.patch('/updateData',patchSalesData)
router.delete('/deleteData/:id',deleteSalesData)

module.exports =router