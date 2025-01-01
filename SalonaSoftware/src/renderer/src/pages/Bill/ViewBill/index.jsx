import React, { useRef, useState } from 'react'
import { ToWords } from 'to-words'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import EXLogo from '../../../assets/logo.png?react'
import { selectSalon } from '../../../slices/salonSlice'
import { useSelector } from 'react-redux'
import { RiLoader2Line } from 'react-icons/ri'

const ViewBill = ({ company, view, setView }) => {
  const [loader, setLoader] = useState(false)
  const salon = useSelector(selectSalon)
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

  const handlePDFDownload = async () => {
    const input = printRef.current
    setLoader(true) // Show loader

    try {
      const canvas = await html2canvas(input, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`Invoice-${view.id}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setLoader(false) // Hide loader
    }
  }

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ease-out ${
        view ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className="relative p-4 w-full max-w-5xl max-h-full bg-white rounded-lg shadow transform transition-opacity duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          <button
            onClick={handlePDFDownload}
            className="bg-green-500 font-semibold text-black mx-2 rounded-lg py-2 px-4 hover:bg-green-400 transition-colors duration-300"
          >
            Get PDF
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-500 font-semibold text-black rounded-lg py-2 px-4 hover:bg-green-400 transition-colors duration-300"
          >
            Print
          </button>
        </div>
        {loader && (
          <div className="bg-gray-200/50 absolute flex justify-center items-center top-0 right-0 w-full h-full">
            <div className="w-40 h-32 bg-white flex flex-col justify-center items-center rounded-lg">
              <div className="animate-spin mx-2">
                <RiLoader2Line size={60} color="black" />
              </div>
              <div className="pt-2">
                <h2 className="text-lg">Generating the PDF</h2>
              </div>
            </div>
          </div>
        )}

        <div ref={printRef} className="w-full overflow-y-scroll border mt-5 h-[600px] p-3">
          <div className="max-w-[1000px] mx-auto">
            {/* Bill content */}
            <div className="flex justify-between mb-5">
              <div className="flex flex-col max-w-[60%]">
                <div className="flex flex-col">
                  <div>
                    <h2 className="text-xl font-bold text-gray-700">{salon?.name}</h2>
                    <p className="text-sm pl-2">{salon?.email}</p>
                    <p className="text-sm pl-2">{salon?.phone}</p>
                    <p className="pt-2 pl-2">{salon?.description}</p>
                    {/* <p className="pl-2">
                      Since {new Date(salon?.created_at).toLocaleDateString()}
                    </p> */}
                  </div>
                </div>
                <div className="flex flex-col mt-5">
                  <h2 className="text-lg font-bold">Bill To:</h2>
                  <span className="text-sm">{view?.customer?.name}</span>
                  <span className="text-sm"> At Branch : {view?.branch?.address}</span>
                  {/* <span className="text-sm">Email: {view?.customer?.email}</span>
                  <span className="text-sm">GST No: {view?.customer?.gst_no}</span> */}
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
            {/* Table and totals */}
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
                      <td className="border border-gray-300 px-2 py-1">S{index + 1}</td>
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
                      <td className="border border-gray-300 px-2 py-1">C{index + 1}</td>
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
                      <td className="border border-gray-300 px-2 py-1">P{index + 1}</td>
                      <td className="border border-gray-300 px-2 py-1">Prodcut</td>
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
            <div></div>
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
            <div className="border-y mt-4 text-center border-gray-300 py-2">
              This software is build and maintained by Nexora Creations | 7887557175 |
              pathaksoham2003@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBill
