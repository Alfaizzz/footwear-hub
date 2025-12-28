export interface StoreSettings {
  saleActive: boolean;
  globalDiscount: number; // percentage
  saleName?: string;
  saleEndDate?: string;
}

let currentSettings: StoreSettings = {
  saleActive: true,
  globalDiscount: 15,
  saleName: 'Winter Sale',
  saleEndDate: '2025-01-31T23:59:59Z',
};

export const getSettings = (): Promise<StoreSettings> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...currentSettings }), 300);
  });
};

export const updateSettings = (settings: Partial<StoreSettings>): Promise<StoreSettings> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentSettings = { ...currentSettings, ...settings };
      resolve({ ...currentSettings });
    }, 400);
  });
};

export const applyDiscount = (price: number): number => {
  if (currentSettings.saleActive && currentSettings.globalDiscount > 0) {
    return price * (1 - currentSettings.globalDiscount / 100);
  }
  return price;
};
