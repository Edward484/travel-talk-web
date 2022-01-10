import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { getAllCategories } from '../../../api/requests/categories/categories-api-requests';
import { Roles } from '../../../models/user';
import { CategoryApiResponse } from '../../../api/types/categories';
import {
  giveUserRole,
  takeUserRole,
} from '../../../api/requests/admin/admin-api-requests';
import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../../../global/atoms/AuthAtoms';

const RoleScene: React.FC = () => {
  const { data: categories } = useQuery('categories', getAllCategories);

  const [username, setUsername] = useState('');
  const apiToken = useRecoilValue(authTokenAtom);
  const [selectedRole, setSelectedRole] = useState<Roles | undefined>(
    undefined,
  );
  const selectedRoleString = useMemo(() => {
    switch (selectedRole) {
      case Roles.Mod: {
        return 'Mod';
      }
      case Roles.Admin: {
        return 'Admin';
      }
      case Roles.CategoryMod: {
        return 'Category Mod';
      }
    }
  }, [selectedRole]);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryApiResponse | undefined
  >(undefined);

  const [showToast, setShowToast] = useState(false);

  const giveRole = async () => {
    if (selectedRole && apiToken) {
      await giveUserRole(
        selectedRole,
        username,
        apiToken.token,
        selectedCategory?.categoryId,
      );
      setShowToast(true);
    }
  };

  const takeRole = async () => {
    if (selectedRole && apiToken) {
      await takeUserRole(
        selectedRole,
        username,
        apiToken.token,
        selectedCategory?.categoryId,
      );
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
          Role Edited
        </Alert>
      </Snackbar>
      <Box marginBottom="1rem">
        <Typography variant="h3" fontSize="1.25rem" fontWeight="700">
          Edit Roles
        </Typography>
      </Box>
      <Box marginBottom="1rem" fontSize="0.75rem" width="200px">
        <TextField
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
          inputProps={{ style: { height: '1rem', fontSize: '0.75' } }}
          variant="standard"
          placeholder="Username of user to edit"
        />
      </Box>
      <Box marginBottom="1rem">
        <Box width="200px">
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRoleString}
              label="Role"
              onChange={e => setSelectedRole(Number.parseInt(e.target.value))}
            >
              <MenuItem value={Roles.Admin}>Admin</MenuItem>
              <MenuItem value={Roles.Mod}>Mod</MenuItem>
              <MenuItem value={Roles.CategoryMod}>Category Mod</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {selectedRole === Roles.CategoryMod && (
        <Box marginBottom="1rem">
          <Box width="200px">
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory?.name ?? ''}
                label="Category"
                onChange={e =>
                  setSelectedCategory(
                    (categories ?? []).find(
                      category =>
                        category.categoryId.toString() === e.target.value,
                    ),
                  )
                }
              >
                {(categories ?? []).map((category, index) => (
                  <MenuItem key={index} value={category.categoryId}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
      <Box marginBottom="1rem" display="flex">
        <Box marginRight="0.5rem">
          <Button
            onClick={giveRole}
            disabled={
              !selectedRole ||
              (selectedRole === Roles.CategoryMod && !selectedCategory)
            }
          >
            Give role
          </Button>
        </Box>
        <Button
          onClick={takeRole}
          disabled={
            !selectedRole ||
            (selectedRole === Roles.CategoryMod && !selectedCategory)
          }
          variant="text"
          color={'error'}
        >
          Take role
        </Button>
      </Box>
    </Box>
  );
};

export default RoleScene;
