import { Box, Button, TextField } from "@mui/material";

interface SearchComponentProps {
  handleSearch: () => void;
  setAccountId: (id: string) => void;
  accountId: string;
}
const Search = ({ handleSearch, accountId, setAccountId }:SearchComponentProps) => {
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      <TextField
        label='Enter account ID'
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        onKeyDown={handleKeyDown}
        variant='outlined'
        fullWidth
      />
      <Button
        disabled={accountId.length < 1}
        variant='contained'
        color='primary'
        onClick={handleSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default Search;
