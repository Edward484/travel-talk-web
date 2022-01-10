import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authTokenAtom } from '../../../global/atoms/AuthAtoms';
import { createCategory } from '../../../api/requests/categories/categories-api-requests';
import { allCategoriesAtom } from '../../../global/atoms/CategoryAtoms';

const CategoryScene = () => {
  const [category, setCategory] = useState('');
  const apiToken = useRecoilValue(authTokenAtom);
  const [showToast, setShowToast] = useState(false);
  const [_, setAllCategories] = useRecoilState(allCategoriesAtom);

  const onSubmit = async () => {
    if (category && apiToken?.token) {
      const res = await createCategory(category, apiToken.token);
      setAllCategories(categories => [...categories, res]);
      setShowToast(true);
    }
  };

  return (
    <Box>
      <Snackbar
        open={showToast}
        onClose={() => setShowToast(false)}
        autoHideDuration={2000}
      >
        <Alert onClose={() => setShowToast(false)} severity="success">
          Category Created
        </Alert>
      </Snackbar>
      <Box marginBottom="1rem">
        <Typography variant="h3" fontSize="1.25rem" fontWeight="700">
          New Category
        </Typography>
      </Box>
      <Box marginBottom="1rem" fontSize="0.75rem">
        <TextField
          value={category}
          onChange={e => setCategory(e.target.value)}
          inputProps={{ style: { height: '1rem', fontSize: '0.75' } }}
          variant="standard"
          placeholder="Category Name"
        />
      </Box>
      <Box>
        <Button onClick={onSubmit} disabled={category === ''}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryScene;
