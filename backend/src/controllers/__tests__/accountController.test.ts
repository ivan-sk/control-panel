import { Request, Response } from "express";
import {
  getAccount,
  updateAccount,
  accountInfo,
} from "@controllers/accountController";

describe("Account Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: jest.Mock;
  let status: jest.Mock;
  let send: jest.Mock;

  beforeEach(() => {
    req = {};
    json = jest.fn();
    send = jest.fn();
    status = jest.fn(() => ({ json })) as any;
    res = { status, json, send };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAccount", () => {
    it("should return the account if found", async () => {
      const mockAccount = accountInfo;
      req.params = { id: "123" };
      await getAccount(req as Request, res as Response);
      expect(json).toHaveBeenCalledWith({
        accountId: req.params.id,
        ...mockAccount,
      });
    });
  });

  describe('updateAccount', () => {
    it('should return 204 on the correct request', async () => {
      const mockUpdatedAccount = { accountId: '123', ownerAddress: 'New Address' };
      req.params = { id: '123' };
      req.body = mockUpdatedAccount

      await updateAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(204);
    });

    it('should return 400 on incorrect request', async () => {
      
      req.params = { id: '123' };
      req.body = { ownerAddress: 'New', accountId: '123' };

      await updateAccount(req as Request, res as Response);
      
      expect(status).toHaveBeenCalledWith(400);
    });
  });
});
