const SERVER_IP = 'http://127.0.0.1:8000/';


export const API_URL = `${SERVER_IP}hnb/`;

export const authUrl = `${API_URL}auth/`;
export const salonOwner = `${API_URL}salon_owner/`;
export const salonOwnerSignIn = `${authUrl}salon_owner/signin/`;
export const salonOwnerSignUp = `${authUrl}salon_owner/signup/`;

export const maintainer = `${API_URL}salon_maintainer/`;
export const salonMaintainerSignIn = `${authUrl}salon_maintainer/signin/`;

export const salon = `${API_URL}salon/`;
export const services = `${API_URL}service/`;
export const combo = `${API_URL}combo/`;
export const coupon = `${API_URL}coupon/`;
export const branch = `${API_URL}branch/`;
export const product = `${API_URL}product/`;
export const bill = `${API_URL}bill/`;
export const dashboard = `${API_URL}dashboard/`;
