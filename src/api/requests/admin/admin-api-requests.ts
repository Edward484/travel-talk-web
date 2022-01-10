import { Roles } from '../../../models/user';
import { deleteRequest, postRequest } from '../../utils/QueryClient';
import { EditRoleBody } from '../../types/admin';

export function giveUserRole(
  role: Roles,
  username: string,
  token: string,
  categoryId?: number,
) {
  if (role === Roles.Admin) {
    return postRequest<void, EditRoleBody>('/Admin/admin', { username }, token);
  } else if (role === Roles.Mod) {
    return postRequest<void, EditRoleBody>('/Admin/mod', { username }, token);
  } else if (role === Roles.CategoryMod && categoryId) {
    return postRequest<void, EditRoleBody>(
      `/Admin/mod/${categoryId}`,
      { username },
      token,
    );
  }
}

export function takeUserRole(
  role: Roles,
  username: string,
  token: string,
  categoryId?: number,
) {
  if (role === Roles.Admin) {
    return deleteRequest<void, EditRoleBody>(
      '/Admin/admin',
      { username },
      token,
    );
  } else if (role === Roles.Mod) {
    return deleteRequest<void, EditRoleBody>('/Admin/mod', { username }, token);
  } else if (role === Roles.CategoryMod && categoryId) {
    return deleteRequest<void, EditRoleBody>(
      `/Admin/mod/${categoryId}`,
      { username },
      token,
    );
  }
}
