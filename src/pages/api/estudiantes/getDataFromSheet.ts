import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { mapArraysToObject } from "@/utils/arrayUtils";

const apiKey = process.env.GOOGLE_SHEETS_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sheetId } = req.body;

  if (!sheetId) {
    return res.status(400).json({
      errorMessage: "URL válida requerida.",
    });
  }
  console.log("[Server]", sheetId);
  const fullSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`;
  const responseFullSheet = await axios.get(fullSheetUrl);

  const sheetValuesUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${responseFullSheet.data.sheets[0].properties.title}?key=${apiKey}&majorDimension=ROWS`;
  const responseSheetValues = await axios.get(sheetValuesUrl);
  res.json(mapArraysToObject(responseSheetValues.data.values));
}
