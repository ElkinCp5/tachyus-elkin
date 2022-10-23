const fs = require("fs");
const pach = require("path");
const express = require("express");
const papa = require("papaparse");
const router = express.Router();
const sources = pach.join(__dirname, "/sources");

const getCompletions = (_, res) => {
  const csv = fs.readFileSync(`${sources}/completions.csv`, {
    encoding: "utf8",
    flag: "r",
  });

  const data = papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  }).data;

  res.status(200).json({ data });
};

const postCompletions = async (req, res) => {
  const body = req.body;

  const csv = papa.unparse(body, {
    quotes: false, //or array of booleans
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ",",
    header: true,
    newline: "\r\n",
    skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
    columns: null, //or array of strings
  });

  const file = fs.writeFileSync(`${sources}/completions2.csv`, csv);

  return res.status(200).json({ file, csv });
};

const getProductions = async (_, res) => {
  const csv = fs.readFileSync(`${sources}/production.csv`, {
    encoding: "utf8",
    flag: "r",
  });

  const data = papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  }).data;

  return res.status(200).json({ data });
};

const postProductions = async (req, res) => {
  const body = req.body;

  const csv = papa.unparse(body, {
    quotes: false, //or array of booleans
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ",",
    header: true,
    newline: "\r\n",
    skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
    columns: null, //or array of strings
  });

  const file = fs.writeFileSync(`${sources}/production2.csv`, csv);

  return res.status(200).json({ file, csv });
};

router.get("/completions/", getCompletions);
router.post("/completions/", postCompletions);

router.get("/productions/", getProductions);
router.post("/productions/", postProductions);

module.exports = router;
