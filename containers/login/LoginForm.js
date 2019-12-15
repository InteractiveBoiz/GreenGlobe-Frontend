import { Component } from 'React-Native';
import { Card, InputItem } from '@ant-design/react-native';

class LoginForm extends Component {
	state = {};
	render() {
		return (
			<Card full>
				<Card.Body>
					<List renderHeader={'Login'}>
						<InputItem
							clear
							onChange={(value) => {
								console.log(value);
								setUser({ ...user, username: value });
							}}
							placeholder={user != null ? data.user.username : 'no username'}
						>
							<Text style={{ fontSize: 12 }}>Username:</Text>
						</InputItem>
					</List>
				</Card.Body>
				<Text>This is part of a login form!</Text>
			</Card>
		);
	}
}

export default LoginForm;
