const express = require('express')
const { getSalesData,postSalesData,patchSalesData,deleteSalesData,getSalesDataById, getHorseData, getJockeysData } = require('../apiControllers/api.controller')
const { error404 } = require('../apiControllers/error.api.controller')

const router =express.Router()

router.get('/getData',getSalesData)
router.get('/getHorseData',getHorseData)
router.get('/getJockeysData',getJockeysData)
router.get('/getData/:id',getSalesDataById)
router.post('/addData',postSalesData)
router.patch('/updateData',patchSalesData)
router.delete('/deleteData/:id',deleteSalesData)
router.get('*',error404)
module.exports =router