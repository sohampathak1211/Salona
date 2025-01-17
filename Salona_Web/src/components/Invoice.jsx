import React, { useRef } from 'react'

const Invoice = () => {
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
      <div ref={printRef} className="p-8 bg-white">
        <div className="flex flex-wrap mb-8">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h5 className="font-bold">From:</h5>
            <address className="text-gray-700">
              <strong>Inspinia, Inc.</strong>
              <br />
              106 George Ave, 600/10
              <br />
              Chicago, VT 32456
              <br />
              <abbr title="Telephone">P:</abbr> (123) 601-4590
            </address>
          </div>

          <div className="w-full md:w-1/2 text-right">
            <h4 className="font-bold">Invoice No.</h4>
            <h4 className="text-blue-500">INV-000567F7-00</h4>
            <span>To:</span>
            <address className="text-gray-700">
              <strong>Corporate, Inc.</strong>
              <br />
              112 Street Avenue, 1080
              <br />
              Miami, CT 445611
              <br />
              <abbr title="Telephone">P:</abbr> (120) 9000-4321
            </address>
            <p>
              <span>
                <strong>Invoice Date:</strong> March 18, 2014
              </span>
              <br />
              <span>
                <strong>Due Date:</strong> March 24, 2014
              </span>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Item List</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Unit Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Tax</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="font-bold">Admin Theme with psd project layouts</div>
                  <small>
                    It is important to take care of the pain itself, and it will be followed by the
                    growth of the patient, but at the same time it will happen that there is a lot
                    of work and pain.
                  </small>
                </td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">$26.00</td>
                <td className="border border-gray-300 px-4 py-2">$5.98</td>
                <td className="border border-gray-300 px-4 py-2">$31.98</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="font-bold">WordPress Theme customization</div>
                  <small>
                    It is very important to take care of the patient, and the patient will be
                    followed, but at the same time they occur as a result of great pain and
                    suffering. At the same time, some great work and pain occurred.
                  </small>
                </td>
                <td className="border border-gray-300 px-4 py-2">2</td>
                <td className="border border-gray-300 px-4 py-2">$80.00</td>
                <td className="border border-gray-300 px-4 py-2">$36.80</td>
                <td className="border border-gray-300 px-4 py-2">$196.80</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="font-bold">Angular JS & Node JS Application</div>
                  <small>
                    It is important to take care of the pain itself, and it will be followed by the
                    growth of the patient, but at the same time it will happen that there is a lot
                    of work and pain.
                  </small>
                </td>
                <td className="border border-gray-300 px-4 py-2">3</td>
                <td className="border border-gray-300 px-4 py-2">$420.00</td>
                <td className="border border-gray-300 px-4 py-2">$193.20</td>
                <td className="border border-gray-300 px-4 py-2">$1033.20</td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="min-w-full table-auto border-collapse border border-gray-300 mb-8">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Sub Total:</td>
              <td className="border border-gray-300 px-4 py-2">$1026.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">TAX:</td>
              <td className="border border-gray-300 px-4 py-2">$235.98</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">TOTAL:</td>
              <td className="border border-gray-300 px-4 py-2">$1261.98</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-gray-100 p-4 rounded">
          <strong>Comments:</strong>
          <p className="text-gray-700">
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
            more-or-less
          </p>
        </div>
      </div>
    </div>
  )
}

export default Invoice
