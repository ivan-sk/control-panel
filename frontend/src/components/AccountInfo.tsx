import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  TextField,
} from "@mui/material";

interface AccountInfoProps {
  error: string | null;
  accountId: string;
  firstName: string;
  lastName: string;
  address: string;
  dateCreated: string;
  isPaid: boolean;
  onSave: (newAddress: string) => Promise<{ success: Boolean }>;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  error,
  accountId,
  firstName,
  lastName,
  address,
  dateCreated,
  isPaid,
  onSave,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newAddress, setNewAddress] = useState(address);

  const handleSave = async () => {
    const result = await onSave(newAddress);
    if (result.success) {
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setNewAddress(address);
    setEditMode(false);
  };

  useEffect(() => {
    setNewAddress(address);
  }, [accountId, address]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Account ID</TableCell>
            <TableCell>{accountId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>{firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last Name</TableCell>
            <TableCell>{lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>
              {editMode ? (
                <TextField
                  fullWidth
                  value={newAddress}
                  error={!!error}
                  helperText={error}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              ) : (
                address
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date Created</TableCell>
            <TableCell>{dateCreated}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paid Account</TableCell>
            <TableCell>{isPaid ? "Yes" : "No"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}
      >
        {editMode ? (
          <Box display="flex" justifyContent="flex-end" gap={2} padding={2}>
            <Button variant='contained' color='error' onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' onClick={handleSave}>
              Save
            </Button>
          </Box>
        ) : (
          <Button
            variant='contained'
            color='primary'
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
        )}
      </div>
    </TableContainer>
  );
};

export default AccountInfo;
