import React from 'react';
import { UPDATE_USER } from './ProfileMutations';
import { useMutation } from '@apollo/react-hooks';

function UpdateUser(id, user) {
	const [ updateUser, { data } ] = useMutation(UPDATE_USER);

    return updateUser({
      variables: {
        id: id,
        user: user
      }
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
}
export default UpdateUser;
