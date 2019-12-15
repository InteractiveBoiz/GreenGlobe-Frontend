import React from 'react';
import UserContext from './UserContext';

class UserProvider extends React.Component {
	state = {
		user: {
      name: "GunnarliDingDong"
    }
	};

	login = (user) => {
		this.setState({ user: user });
	};

	render() {
		return (
			<UserContext.Provider value={{ user: this.state.user, login: this.login }}>
				{this.props.children}
			</UserContext.Provider>
		);
	}
} export default UserProvider
