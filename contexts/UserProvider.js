import React from 'react';
import UserContext from './UserContext';

class UserProvider extends React.Component {
	state = {
		user: {
      name: "Swagger"
    }
	};

	login = (user) => {
		this.setState({ user: user }, function(){console.log("UserProvider State: ", this.state.user)});
	};

	render() {
		return (
			<UserContext.Provider value={{ user: this.state.user, login: this.login }}>
				{this.props.children}
			</UserContext.Provider>
		);
	}
} export default UserProvider
