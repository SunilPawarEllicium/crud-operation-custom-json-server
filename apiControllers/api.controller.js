// const { getData } = require("../fileHandle/connecting")
const dotenv = require("dotenv").config();
const { getAllData } = require("../fileGenerator/get.all.data");
const { catchHandler } = require("../allHandlers/handlers");
const addDataServices = require("../apiServices/add.data.services");
const { returnGreaterOrSmaller } = require("../utils/helper");
const updateDataServices = require("../apiServices/update.data.services");
const deleteDataServices = require("../apiServices/delete.data.services");
const fileName = process.env.FILE_NAME;

const getSalesData = async (req, res) => {
  const queryObject = req.query;
  const data = await getAllData(`${fileName}.json`);

  let manipulatedData = [...data];
  if (queryObject.q) {
    if (queryObject.attr) {
      const attrData = queryObject.attr.split(",");
      manipulatedData = manipulatedData.filter((obj) =>
        Object.keys(obj).some(
          (key) =>
            (obj[key] ?? "")
              .toString()
              .toLowerCase()
              .includes(queryObject.q.toLowerCase()) &&
            Object.keys(obj).filter((key) => attrData.includes(key)).length
        )
      );
    } else {
      manipulatedData = manipulatedData.filter((obj) =>
        Object.keys(obj).some((key) =>
          (obj[key] ?? "")
            .toString()
            .toLowerCase()
            .includes(queryObject.q.toLowerCase())
        )
      );
    }
  }
  if (queryObject._sort) {
    if (queryObject._order === "asc") {
      manipulatedData = manipulatedData.sort((a, b) => {
        const nameA = (a[queryObject._sort] ?? "").toString().toUpperCase(); // ignore upper and lowercase
        const nameB = (b[queryObject._sort] ?? "").toString().toUpperCase(); // ignore upper and lowercase
        return returnGreaterOrSmaller(nameB, nameA);
      });
    } else if (queryObject._order === "desc") {
      manipulatedData = manipulatedData.sort((a, b) => {
        const nameA = (a[queryObject._sort] ?? "").toString().toUpperCase(); // ignore upper and lowercase
        const nameB = (b[queryObject._sort] ?? "").toString().toUpperCase(); // ignore upper and lowercase
        return returnGreaterOrSmaller(nameA, nameB);
      });
    } else {
      manipulatedData = manipulatedData.sort((a, b) => {
        const nameA = (a[queryObject._sort] ?? "").toString().toUpperCase(); // ignore upper and lowercase
        const nameB = (b[queryObject._sort] ?? "").toString().toUpperCase(); // ignore upper and lowercase
        return returnGreaterOrSmaller(nameB, nameA);
      });
    }
  }
  if (!queryObject._sort && queryObject._order === "asc") {
    manipulatedData = manipulatedData.sort((a, b) => {
      const nameA = (a[queryObject._sort] ?? "").toString().toUpperCase(); // ignore upper and lowercase
      const nameB = (b[queryObject._sort] ?? "").toString().toUpperCase(); // ignore upper and lowercase
      return returnGreaterOrSmaller(nameB, nameA);
    });
  }
  if (!queryObject._sort && queryObject._order === "desc") {
    manipulatedData = manipulatedData.sort((a, b) => {
      const nameA = (a[queryObject._sort] ?? "").toString().toUpperCase(); // ignore upper and lowercase
      const nameB = (b[queryObject._sort] ?? "").toString().toUpperCase(); // ignore upper and lowercase
      return returnGreaterOrSmaller(nameA, nameB);
    });
  }
  if (queryObject._start && queryObject._end) {
    manipulatedData = manipulatedData.slice(
      queryObject._start,
      queryObject._end
    );
  }
  if (queryObject._limit) {
    manipulatedData = manipulatedData.slice(0, queryObject._limit);
  }
  return res.status(200).json(manipulatedData);
};

const getSalesDataById = async (req, res) => {
  try {
    const data = await getAllData(`${fileName}.json`);
    const params = req.params;
    const manipulatedData = data.filter((row) => row.index == params.id);
    return res.status(200).json(manipulatedData);
  } catch (error) {
    catchHandler(req, res, error);
  }
};
const postSalesData = async (req, res, next) => {
  try {
    const data = (await getAllData(`${fileName}.json`)) ?? [];
    const body = req.body ?? {};
    if (!body.index)
      return catchHandler(req, res, { message: "Index not exist." }, 400);
    // check index is exist
    const isExist = data.find((row) => row.index === body.index);
    if (!isExist) {
      const result = await addDataServices(req, res, data, `${fileName}.json`, body);
      return res.status(200).json({
        success: 1,
        data: result,
        message: "Data added successfully.",
      });
    } else {
      catchHandler(req, res, { message: "Index already exist." }, 409);
    }
  } catch (error) {
    catchHandler(req, res, error);
  }
};

const patchSalesData = async (req, res, next) => {
  try {
    const data = await getAllData(`${fileName}.json`);
    const body = req.body;
    if (JSON.stringify(body) === "{}")
      return catchHandler(req, res, { message: "Wrong data." }, 400);
    const isExistIndex = data.findIndex((row) => row.index === body.index);
    if (isExistIndex !== -1) {
      const result = await updateDataServices(
        req,
        res,
        data,
        `${fileName}.json`,
        body,
        isExistIndex
      );
      return res.status(200).json({
        success: 1,
        data: result,
        message: "Data updated successfully.",
      });
    } else {
      catchHandler(req, res, { message: "Index key is not exist." }, 400);
    }
  } catch (error) {
    catchHandler(req, res, error);
  }
};

const deleteSalesData = async (req, res, next) => {
  try {
    const data = (await getAllData(`${fileName}.json`)) ?? [];
    const params = req.params ?? {};
    if (!params.id)
      return catchHandler(req, res, { message: "Index key not exist." }, 400);
    // check index is exist
    const isExist = data.findIndex((row) => row.index == params.id);
    if (isExist !== -1) {
      const result = await deleteDataServices(
        req,
        res,
        data,
        `${fileName}.json`,
        params,
        isExist
      );
      return res.status(200).json({
        success: 1,
        data: result,
        message: "Data deleted successfully.",
      });
    } else {
      catchHandler(req, res, { message: "Index key is not exist." }, 409);
    }
  } catch (error) {
    catchHandler(req, res, error);
  }
};

module.exports = {
  getSalesData,
  getSalesDataById,
  postSalesData,
  patchSalesData,
  deleteSalesData,
};
