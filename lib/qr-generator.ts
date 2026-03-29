// Generate QR Code Data URL using external API
// This generates a QR code for UPI payment links

export function generatePaymentQRCodeURL(upiString: string): string {
  // Using qr-server.com API for QR code generation
  // Safe alternative that doesn't require npm package installation
  const encodedUPI = encodeURIComponent(upiString);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUPI}`;
}

export function generateUPIString(upiId: string, name: string, amount: number, orderId: string): string {
  // UPI deep link format
  // Format: upi://pay?pa=<UPI ID>&pn=<NAME>&am=<AMOUNT>&tn=<TRANSACTION NOTE>
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&tn=Order${orderId}`;
}

export function generateUPILink(upiId: string, name: string, amount: number, orderId: string): string {
  const upiString = generateUPIString(upiId, name, amount, orderId);
  return generatePaymentQRCodeURL(upiString);
}
