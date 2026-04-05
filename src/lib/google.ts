import { google } from "googleapis";
import path from "path";

// Authentication setup using a service account
// This requires a service-account.json file in the root directory
const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/documents",
];

export async function getGoogleAuthClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    : undefined;

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  return auth;
}

export const sheets = (auth: any) => google.sheets({ version: "v4", auth });
export const docs = (auth: any) => google.docs({ version: "v1", auth });
