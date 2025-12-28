import { Request, Response } from 'express';
import Setting from '../models/Setting';

export const getSettings = async (req: Request, res: Response) => {
  let setting = await Setting.findOne();
  if (!setting) {
    setting = new Setting({ saleActive: false, globalDiscount: 0 });
    await setting.save();
  }
  res.json(setting);
};

export const updateSettings = async (req: Request, res: Response) => {
  const { saleActive, globalDiscount, faq, returnPolicy, sizeGuide, footer } = req.body;
  const setting = await Setting.findOneAndUpdate({}, { saleActive, globalDiscount, faq, returnPolicy, sizeGuide, footer }, { upsert: true, new: true });
  res.json(setting);
};
