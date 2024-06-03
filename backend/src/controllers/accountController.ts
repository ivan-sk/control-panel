import { Request, Response } from "express";
import { updateAccountSchema } from "@validation/accountValidation";


// Dummy account info
export const accountInfo = {
  ownerFirstName: "Ivan",
  ownerLastName: "Skubko",
  ownerAddress: "Khreschatyk St, 22, Kyiv, 01001",
  dateCreated: "2024-01-01",
  paidAccount: true,
};

export const getAccount = (req: Request, res: Response) => {
  const accountId = req.params.id;

  res.json({ accountId, ...accountInfo });
};

export const updateAccount = (req: Request, res: Response) => {
  const { error } = updateAccountSchema.validate(req.body);
  if (error) {
    res.status(400)
    return res.json({ error });
  }

  const accountId = req.params.id;
  const { ownerAddress } = req.body;

  // Update account
  res.status(204)
  return res.send();
};
