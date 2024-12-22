export const printCssString = `body {
  font-family: Arial, sans-serif;
}

.company-details span,
.bill-to span,
.from-to span,
.invoice-table th,
.invoice-details td {
  font-size: 14px;
}

.invoice-table th,
.invoice-table td {
  font-size: 12px;
}

.container {
  max-width: 1000px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.company-info {
  max-width: 60%;
}

.company-info,
.company-details,
.bill-to,
.invoice-details,
.from-to {
  display: flex;
  flex-direction: column;
}

.company-details h2,
.bill-to h2 {
  font-size: 20px;
  font-weight: bold;
}

.bill-to {
  margin-top: 20px;
}

.invoice-img {
  height: 110px;
  width: 100px;
  text-align: right;
}

h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

.transportation-details {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.table-container {
  margin-bottom: 16px;
  overflow-x: auto;
}
.invoice-table {
  width: 100%;
  border: 1px solid #d1d5db;
  border-collapse: collapse;
  table-layout: fixed;
}

.invoice-table th {
  border: 1px solid #d1d5db;
  padding: 8px;
  text-align: left;
  word-wrap: break-word;
}
.invoice-table td {
  border: 1px solid #d1d5db;
  font-size: 14px;
  padding: 4px;
  text-align: left;
  word-wrap: break-word;
}
.sr {
  width: 35px;
}

.invoice-table th {
  background-color: #f3f4f6;
}

.amount-section {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #d1d5db;
  padding-top: 16px;
}

.sub-total,
.total {
  max-width: 50%;
  display: flex;
  flex-direction: column;
}

.tax-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tax-breakdown {
  display: flex;
  flex-direction: column;
}

.thanks {
  text-align: center;
}

.thanks p {
  font-style: italic;
}

.footer {
  padding: 7px;
  background-color: #f3f4f6;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

`
