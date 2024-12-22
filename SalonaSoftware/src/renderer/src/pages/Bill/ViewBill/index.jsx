import React, { useEffect, useState } from 'react'
import './print.css'
import { printCssString } from './stringcss'
import { ToWords } from 'to-words'
import EXLogo  from '../../../assets/logo.png?react'

const ViewBill = ({company, view, setView }) => {
  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: 'Rupee',
        plural: 'Rupees',
        symbol: '₹',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paise',
          symbol: ''
        }
      }
    }
  })

  const [total_cgst,setCgst] = useState(0.0)
  const [total_sgst,setSgst] = useState(0.0)
  
  useEffect(()=>{
    let tempCGST = 0.0;
    let tempSGST = 0.0;
    view.items.map(item=>{
      tempCGST+= parseFloat(item.cgst)
      tempSGST+= parseFloat(item.sgst)
    })
    setCgst(tempCGST)
    setSgst(tempSGST)
  },[])

  const handleClose = () => {
    setView(null)
  }
  console.log(view)

  const handlePrint = () => {
    // Select the container content
    const containerElement = document.querySelector('.container')

    // If the container exists, get its innerHTML
    if (containerElement) {
      // Get the content inside the container
      let contentInsideContainerClass = containerElement.innerHTML

      // Replace all occurrences of 'className' with 'class' in the content
      contentInsideContainerClass = contentInsideContainerClass.replace(/className/g, 'class')

      // Create the full HTML content for the print request
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Invoice</title>
            <link rel="stylesheet" href="./print.css">
            <style>
             ${printCssString}
            </style>
          </head>
          <body>
            <div class="container">
              ${contentInsideContainerClass}
            </div>
          </body>
        </html>
      `

      // Send the HTML content to Electron for printing
      window.electron.ipcRenderer.send('print-content', htmlContent)
    }
  }

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ease-out ${view ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className="relative p-4 w-full max-w-5xl max-h-full bg-white rounded-lg shadow transform transition-opacity duration-300 ease-out"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="w-full flex justify-end">
          <button
            onClick={handlePrint}
            className="bg-green-500 font-semibold text-black mx-2 rounded-lg py-2 px-4 hover:bg-green-400 transition-colors duration-300"
          >
            Get pdf
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-500 font-semibold text-black rounded-lg py-2 px-4 hover:bg-green-400 transition-colors duration-300"
          >
            Print
          </button>
        </div>
        <div className="w-full overflow-y-scroll border mt-5 h-[600px] p-3">
          <div className="container">
            <div className="header">
              <div className="company-info">
                <div className="company-details">
                  <h2>{company?.cName}</h2>
                  <span>{company?.address}</span>
                  <span>Email: {company?.email}</span>
                  <span>GST No: {company?.gst_n}</span>
                </div>
                <div className="bill-to">
                  <h2>Bill To:</h2>
                  <span>{view.ven_id.name}</span>
                  <span>{view.ven_id.address}</span>
                  <span>Email: {view.ven_id.email}</span>
                  <span>GST No: {view.ven_id.gst_no}</span>
                </div>
              </div>
              <div className="invoice-details">
                <img
                  src={EXLogo}
                  alt="Shivaji Maharaj Icon"
                  className="invoice-img"
                />
                <p>Invoice No: {view.id}</p>
                <p>Date: {view.date.split('-').reverse().join('-')}</p>
              </div>
            </div>

            <h3>Transportation Details:</h3>
            <div className="transportation-details">
              <div className="from-to">
                <span>
                  <strong>From:</strong> {view.from_add}
                </span>
                <span>
                  <strong>To:</strong> {view.to_add}
                </span>
              </div>
              <span>
                <strong>Vehicle No:</strong>
                {view.veh_id == null ? 'Vehicle was deleted' : view.veh_id.number}
              </span>
            </div>

            <div className="table-container">
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th className="sr">Sr.</th>
                    <th>Item</th>
                    <th className="hsn">HSN SAC</th>
                    <th className="qty">Qty.</th>
                    <th className="unit">Unit</th>
                    <th className="ppu">Price/Unit</th>
                    <th className="tt">Taxable</th>
                    <th className="cgst">CGST 6%</th>
                    <th className="sgst">SGST 6%</th>
                    <th className="amount">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {view.items.map((item, index) => (
                    <tr>
                      <td className="sr">{index + 1}</td>
                      <td>{item.name}</td>
                      <td className="hsn">{item.hsn_sac}</td>
                      <td className="qty">{item.quantity}</td>
                      <td className="unit">{item.unit}</td>
                      <td className="ppu">{item.price_per_unit}</td>
                      <td className="tt">{item.taxable_amt}</td>
                      <td className="cgst">{item.cgst}</td>
                      <td className="sgst">{item.sgst}</td>
                      <td className="amount">
                        ₹
                        {parseFloat(item.taxable_amt) +
                          parseFloat(item.cgst) +
                          parseFloat(item.sgst)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="amount-section">
              <div className="sub-total">
                <span>
                  <strong>Amount in words: </strong>
                  {toWords.convert(view.total_amt)}
                </span>
              </div>
              <div className="total">
                <span>
                  <strong>Total: </strong>₹{view.total_amt}
                </span>
                <span>
                  <strong>Round Off: </strong>
                  {view.round_amt}
                </span>
              </div>
              <div className="total">
                <span>
                  <strong>Recieved: </strong>₹
                  {parseFloat(view.total_amt) - parseFloat(view.pending)}
                </span>
                <span>
                  <strong>Balance: </strong>₹{parseFloat(view.pending)}
                </span>
              </div>
            </div>

            <div className="tax-details">
              <div className="tax-breakdown">
                <span>CGST 6%: ₹{total_cgst}</span>
                <span>SGST 6%: ₹{total_sgst}</span>
              </div>
              <div className="thanks">
                <p>Thanks for Doing Business with Chandrabhaga Transport</p>
              </div>
            </div>

            <div className="footer">
              <strong>
                Bill is generated by ExpenseEase Software | Build Website, Software, Apps |
                7887557175 | pathaksoham2003@gmail.com
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBill
