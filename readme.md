Google Spreadsheet to JSON API service.

## About

All credit for code basis to http://gsx2json.com

## Install

- Run `npm install`
- Run `node app`

## Usage

First, you must publish your spreadsheet to the web, using `File -> Publish To Web` in your Google Spreadsheet.

You can then access your readable JSON API using the `/api` endpoint. You can change this in app.js.

```
http://example.com/api?id=SPREADSHEET_ID&sheet=SHEET_NUMBER
```

This will update live with changes to the spreadsheet.

### Parameters

**id (required):** The ID of your document. This is the big long aplha-numeric code in the middle of your document URL.

**sheet (optional):** The number of the individual sheet you want to get data from. Your first sheet is 1, your second sheet is 2, etc. If no sheet is entered then 1 is the default.

**q (optional):** A simple query string. This is case insensitive and will add any row containing the string in any cell to the filtered result.

**integers (optional - default: true)**: Setting 'integers' to false will return numbers as a string.

