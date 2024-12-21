// Function to validate vendor form inputs
export const validateVendor = (vendor) => {
  const { name, email, domain, address, phone, gst_no } = vendor

  if (!name) {
    return { status: false, message: 'Name is required' }
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return { status: false, message: 'A valid email is required' }
  }

  if (!phone || phone.length < 10) {
    return { status: false, message: 'Phone number must be at least 10 digits' }
  }

  if (!address) {
    return { status: false, message: 'Address is required' }
  }

  if (gst_no && gst_no.length !== 15) {
    return { status: false, message: 'GST Number should be 15 characters' }
  }

  return true
}
