import React from 'react';
import { ScrollView, Text } from 'react-native';
import { List } from '@ant-design/react-native';
import { Query } from 'react-apollo';
import EventCard from '../../components/EventCard';
import { withNavigation } from 'react-navigation';
//{userId: 'user/1-A'}
const EventList = (props) => {
	const queryToUse = props.queryToUse;
	const variablesToUse = props.variablesToUse;
	return (
		<Query query={queryToUse} variables={variablesToUse}>
			{({ loading, error, data }) => {
				if (loading) return <Text>Loading...</Text>;
				if (error) return <Text>Error! {error.message}</Text>;
				console.log(data);
				return (
					<ScrollView
						style={{ flex: 1, backgroundColor: '#f5f5f9' }}
						automaticallyAdjustContentInsets={false}
						showsHorizontalScrollIndicator={true}
						showsVerticalScrollIndicator={true}
					>
						<List>
							{data.events != undefined ? (
								data.events.map((event) => (
									<EventCard event={event} key={event.id} navigation={props.navigation} />
								))
							) : (
								<Text>No Data</Text>
							)}
						</List>
					</ScrollView>
				);
			}}
		</Query>
	);
};
export default withNavigation(EventList);

/*
<List>{data.events.map(({ id, eventName }) => <EventCard eventName={eventName} key={id} />)}</List>
<Item data-seed="logId" key={id}>
                                <Text>{id}: {eventName}</Text>
							</Item>
							
const EventList = () => {
	const { loading, error, data } = useQuery(GET_EVENTS);

	if (loading)
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	if (error)
		return (
			<View>
				<Text>Error...</Text>
			</View>
		);
	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: '#f5f5f9' }}
			automaticallyAdjustContentInsets={false}
			showsHorizontalScrollIndicator={true}
			showsVerticalScrollIndicator={true}
		>
			<List>{data.events.map((event) => <EventCard event={event} key={event.id} />)}</List>
		</ScrollView>
	);
};



*/
