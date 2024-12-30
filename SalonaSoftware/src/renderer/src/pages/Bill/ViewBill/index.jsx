import React, { useEffect, useRef } from 'react'
import { ToWords } from 'to-words'
import EXLogo from '../../../assets/logo.png?react'

const ViewBill = ({ company, view, setView }) => {
  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
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

  const printRef = useRef()

  const handleClose = () => {
    setView(null)
  }

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML
    const originalContents = document.body.innerHTML

    document.body.innerHTML = printContents
    window.print()

    document.body.innerHTML = originalContents
    window.location.reload()
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
        onClick={(e) => e.stopPropagation()}
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
          <div ref={printRef} className="max-w-[1000px] mx-auto">
            <div className="flex justify-between mb-5">
              <div className="flex flex-col max-w-[60%]">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">{company?.cName}</h2>
                  <span className="text-sm">{company?.address}</span>
                  <span className="text-sm">Email: {company?.email}</span>
                </div>
                <div className="flex flex-col mt-5">
                  <h2 className="text-lg font-bold">Bill To:</h2>
                  <span className="text-sm">{view?.customer?.name}</span>
                  <span className="text-sm">{view?.branch?.address}</span>
                  <span className="text-sm">Email: {view?.customer?.email}</span>
                  <span className="text-sm">GST No: {view?.customer?.gst_no}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <img src={EXLogo} alt="Logo" className="h-28 w-24" />
                <p className="text-sm">Invoice No: {view.id}</p>
                <p className="text-sm">
                  Date: {view.created_at.split('T')[0].split('-').reverse().join('-')}
                </p>
              </div>
            </div>

            <h3 className="text-base font-semibold mb-2">Items:</h3>

            <div className="overflow-x-auto mb-4">
              <table className="w-full border border-gray-300 border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-2 py-1 text-left">Sr.</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Type</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Item</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Qty.</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Price/Unit</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {view.services.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                      <td className="border border-gray-300 px-2 py-1">Service</td>
                      <td className="border border-gray-300 px-2 py-1">{item.name}</td>
                      <td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
                      <td className="border border-gray-300 px-2 py-1">₹{item.price}</td>
                      <td className="border border-gray-300 px-2 py-1">
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {view.combos.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                      <td className="border border-gray-300 px-2 py-1">Combo</td>
                      <td className="border border-gray-300 px-2 py-1">{item.name}</td>
                      <td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
                      <td className="border border-gray-300 px-2 py-1">₹{item.price}</td>
                      <td className="border border-gray-300 px-2 py-1">
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {view.product.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                      <td className="border border-gray-300 px-2 py-1">Product</td>
                      <td className="border border-gray-300 px-2 py-1">{item.name}</td>
                      <td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
                      <td className="border border-gray-300 px-2 py-1">₹{item.price}</td>
                      <td className="border border-gray-300 px-2 py-1">
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between border-t border-gray-300 pt-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  Amount in words: {toWords.convert(view.total_amount)}
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-sm font-semibold">Total: ₹{view.total_amount}</span>
                <span className="text-sm font-semibold">
                  After Discount: ₹
                  {parseFloat(view.total_amount) - parseFloat(view.discount_applied)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-center italic">
                <p>Thanks for Doing Business with {company?.cName}</p>
              </div>
            </div>

            <div className="bg-gray-200 text-center py-2 mt-4 text-sm text-gray-700">
              <strong>
                Generated by Salona Software powered by Nexora Creations | Build Website, Software, Apps |
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
