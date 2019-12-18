import React from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { useQuery } from 'react-apollo';
import EventCard from '../../components/events/EventCard';
import { withNavigation } from 'react-navigation';
//{userId: 'user/1-A'}
const EventList = (props) => {
	const queryToUse = props.queryToUse;
	const variablesToUse = props.variablesToUse;

	console.log('queryToUse', queryToUse);
	console.log('variablesToUse', variablesToUse);

	const { loading, error, data, refetch, networkStatus } = useQuery(queryToUse, {
		variables: variablesToUse,
		notifyOnNetworkStatusChange: true
	});

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>`Error! ${error.message}`</Text>;
	if (data.events.length <= 0) return <Text>{props.emptyListText}</Text>;
	console.log('data', data);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={data.events}
				renderItem={(event) => <EventCard event={event.item} refetch={refetch}/>}
				keyExtractor={(event) => event.id}
				refreshing={networkStatus === 4}
				onRefresh={() => refetch()}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16
	}
});

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
						<RefreshTest refetch={refetch}/>
					</ScrollView>



					<Query query={queryToUse} variables={variablesToUse} notifyOnNetworkStatusChange>
			{({ loading, error, data, refetch, networkStatus }) => {
				if (networkStatus === 4) <Text>Refetching!</Text>;
				if (loading) return <Text>Loading...</Text>;
				if (error) return <Text>Error! {error.message}</Text>;
				console.log('data', data);
				return (
					<SafeAreaView style={styles.container}>
						<FlatList
							data={data.events}
							renderItem={(event) => (console.log(event), <EventCard event={event.item} />)}
							keyExtractor={(event) => event.id}
							refreshing={false}
							onRefresh={() => refetch()}
						/>
					</SafeAreaView>
				);
			}}
		</Query>
*/
