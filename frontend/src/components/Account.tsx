import React, { useState } from "react";
import { Container, Typography } from "@mui/material";

import Navbar from "components/Navbar";
import AccountInfo from "components/AccountInfo";
import Search from "components/Search";
import axios from "utils/axios";
import { AxiosResponse } from "axios";

interface AccountInfoData {
  accountId: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerAddress: string;
  dateCreated: string;
  paidAccount: boolean;
}

const Account: React.FC = () => {
  const [accountId, setAccountId] = useState<string>("");
  const [accountInfo, setAccountInfo] = useState<AccountInfoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    const response: AxiosResponse | void = await axios
      .get(`/account/${accountId}`, { withCredentials: true })
      .catch((err) => {
        console.log(err);
      });
    setAccountInfo(response?.data);
  };

  const handleSave = async (
    newAddress: string
  ): Promise<{ success: Boolean }> => {
    setAccountInfo((prevData) =>
      prevData
        ? {
            ...prevData,
            ownerAddress: newAddress,
          }
        : null
    );
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/account/${accountId}`,
        {
          accountId: accountInfo?.accountId,
          ownerAddress: newAddress,
        },
        { withCredentials: true }
      );
      setError(null);
      return { success: true };
    } catch (error: any) {
      const errorDetails = error.response?.data?.error?.details;
      if (errorDetails && errorDetails.length > 0) {
        setError(errorDetails[0].message);
      } else {
        setError("An unexpected error occurred.");
      }
      return { success: false };
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth='md' sx={{ mt: 8 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Account
        </Typography>
        <Search
          handleSearch={handleSearch}
          accountId={accountId}
          setAccountId={setAccountId}
        />
        {accountInfo && (
          <AccountInfo
            error={error}
            accountId={accountInfo.accountId}
            firstName={accountInfo.ownerFirstName}
            lastName={accountInfo.ownerLastName}
            address={accountInfo.ownerAddress}
            dateCreated={accountInfo.dateCreated}
            isPaid={accountInfo.paidAccount}
            onSave={handleSave}
          />
        )}
      </Container>
    </>
  );
};

export default Account;
