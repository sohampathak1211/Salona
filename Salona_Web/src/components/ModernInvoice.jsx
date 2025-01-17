import React, { useRef } from 'react'

const ModernInvoice = () => {
  const printRef = useRef()

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML
    const originalContents = document.body.innerHTML

    // Replace the document's body with the print content
    document.body.innerHTML = printContents
    window.print()

    // Restore the original document body after printing
    document.body.innerHTML = originalContents
    window.location.reload() // Reload to ensure the page renders back correctly
  }
  return (
    <div className="w-full h-full flex flex-col">
      <button onClick={handlePrint}>Print</button>
      <div ref={printRef} className="max-w-5xl mx-auto p-8 bg-gray-100 text-gray-800">
        {/* Header Section */}
        <header className="flex justify-between items-center pb-6 border-b border-gray-300">
          <div>
            <h1 className="text-3xl font-bold">Invoice</h1>
            <p className="text-sm text-gray-600">Invoice No: INV-000567F7-00</p>
            <p className="text-sm text-gray-600">Date: March 18, 2014</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Inspinia, Inc.</h2>
            <p>106 George Ave, 600/10</p>
            <p>Chicago, VT 32456</p>
            <p>Phone: (123) 601-4590</p>
          </div>
        </header>

        {/* Billing Details */}
        <section className="grid grid-cols-2 gap-6 mt-8">
          {/* From Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">Bill From</h3>
            <p className="text-gray-600 mt-2">Inspinia, Inc.</p>
            <p className="text-gray-600">106 George Ave, 600/10</p>
            <p className="text-gray-600">Chicago, VT 32456</p>
            <p className="text-gray-600">Phone: (123) 601-4590</p>
          </div>

          {/* To Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">Bill To</h3>
            <p className="text-gray-600 mt-2">Corporate, Inc.</p>
            <p className="text-gray-600">112 Street Avenue, 1080</p>
            <p className="text-gray-600">Miami, CT 445611</p>
            <p className="text-gray-600">Phone: (120) 9000-4321</p>
          </div>
        </section>

        {/* Itemized Billing */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice Details</h3>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-200 text-gray-600">
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Unit Price</th>
                  <th className="py-3 px-4">Tax</th>
                  <th className="py-3 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Admin Theme with PSD</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">$26.00</td>
                  <td className="py-3 px-4">$5.98</td>
                  <td className="py-3 px-4">$31.98</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">WordPress Theme Customization</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">$80.00</td>
                  <td className="py-3 px-4">$36.80</td>
                  <td className="py-3 px-4">$196.80</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Angular & Node JS Application</td>
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">$420.00</td>
                  <td className="py-3 px-4">$193.20</td>
                  <td className="py-3 px-4">$1,033.20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Summary */}
        <section className="flex justify-end mt-8">
          <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">$1,026.00</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium">$235.98</span>
            </div>
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-lg font-semibold text-gray-800">$1,261.98</span>
            </div>
          </div>
        </section>

        {/* Footer Notes */}
        <footer className="mt-8 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p>
            Thank you for your business! If you have any questions about this invoice, please
            contact us at support@inspinia.com or call (123) 601-4590.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default ModernInvoice
