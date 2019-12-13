import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Card, Carousel, WhiteSpace, Button } from '@ant-design/react-native';
import { Mutation } from 'react-apollo';
import { ATTEND_EVENT } from '../../graphql/event/EventMutations'

const EventDetail = (props) => {
	const event = props.navigation.getParam('event');
	return (
		<Mutation mutation={ATTEND_EVENT}>
			{(attendMutation, { data }) => (
				<ScrollView>
					<Card full>
						<Card.Body height="100%">
							<Carousel style={styles.wrapper} selectedIndex={2} autoplay infinite>
								<View style={[ styles.containerHorizontal, { backgroundColor: 'red' } ]}>
									<Text>Carousel 1</Text>
								</View>
								<View style={[ styles.containerHorizontal, { backgroundColor: 'blue' } ]}>
									<Text>Carousel 2</Text>
								</View>
								<View style={[ styles.containerHorizontal, { backgroundColor: 'yellow' } ]}>
									<Text>Carousel 3</Text>
								</View>
								<View style={[ styles.containerHorizontal, { backgroundColor: 'aqua' } ]}>
									<Text>Carousel 4</Text>
								</View>
								<View style={[ styles.containerHorizontal, { backgroundColor: 'fuchsia' } ]}>
									<Text>Carousel 5</Text>
								</View>
							</Carousel>
							<View>
								<Text style={{ marginLeft: 16 }}>{`${event.eventDate} - ${event.eventEnd}`}</Text>
								<Text style={{ marginLeft: 16, fontWeight: 'bold' }}>{event.eventName}</Text>
								<View
									style={{
										borderBottomColor: 'black',
										borderBottomWidth: 1
									}}
								/>
								<Text style={{ marginLeft: 16, fontWeight: 'bold' }}>Event Activity:</Text>
								<Text style={{ marginLeft: 16 }}>{event.eventActivity}</Text>
								<Text style={{ marginLeft: 16, fontWeight: 'bold' }}>Event Attendees:</Text>
								<Text style={{ marginLeft: 16 }}>{event.attendees}</Text>
								<WhiteSpace />
								<Button
									type="primary"
									onPress={() => {
										attendMutation({
											variables: {
												userId: "user/1-B",
												eventId: event.id
											}
										})
											.then((res) => console.log(res))
											.catch((err) => <Text>{err}</Text>);
									}}
								>
									Participate
								</Button>
								<WhiteSpace />
								<View
									style={{
										borderBottomColor: 'black',
										borderBottomWidth: 1
									}}
								/>
								<Text style={{ marginLeft: 16, fontWeight: 'bold' }}>Event Description:</Text>
								<Text style={{ marginLeft: 16 }}>{event.eventDescription}</Text>
								<Text style={{ marginLeft: 16, fontWeight: 'bold' }}>Event Requirements:</Text>
								<Text style={{ marginLeft: 16 }}>{event.eventRequirements}</Text>
							</View>
						</Card.Body>
					</Card>
				</ScrollView>
			)}
		</Mutation>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#fff'
	},
	containerHorizontal: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 150
	},
	containerVertical: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 150
	},
	text: {
		color: '#fff',
		fontSize: 36
	}
});

export default EventDetail;

/*
<Mutation mutation={addDog} refetchQueries={[{ query: dogQuery }]}>
            {(addDogMutation, { data }) => (
                <Button
                  onPress={() => {
                    addDogMutation({
                      variables: {
                        type: this.state.type,
                        name: this.state.name
                      }
                    })
                      .then(res => res)
                      .catch(err => <Text>{err}</Text>);
                    this.setState({ type: '', name: '' });
                  }}
                  title="Add dog"
                />
            )}
		  </Mutation>
		  */
