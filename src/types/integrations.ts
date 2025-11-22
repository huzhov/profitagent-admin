export type WhatsAppResponse = {
  id: string;
  businessId: string;
  wabaId: string;
  waBusinessPortfolioId: string;
  phoneNumberId: string;
  displayPhoneNumber: string;
  status: string;
  waLink: null;
  authToken: string;
  tokenExpiresAt: string;
  lastSyncedAt: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateWhatsApp = {
  waBusinessPortfolioId: string;
  accessToken: string;
  wabaId: string;
  accountName: string;
  phoneNumberId: string;
  pinCode: string;
};

export type CreateWhatsAppResponse = {
  id: string;
};
