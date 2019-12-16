import React from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { useQuery } from 'react-apollo';
import GroupCard from '../../components/group/GroupCard';
import { withNavigation } from 'react-navigation';
import { GET_GROUPS } from '../../graphql/group/GroupQuerries';
import client from '../../graphql/GroupClient';

const GroupsList = (props) => {
	const { loading, error, data, refetch, networkStatus } = useQuery(GET_GROUPS, {
		client: client
	});

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>`Error! ${error.message}`</Text>;
	if (data.groups.length <= 0) return <Text>{props.emptyListText}</Text>;
	console.log('data', data);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={data.groups}
				renderItem={(group) => <GroupCard group={group.item} />}
				keyExtractor={(group) => group.id}
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

export default withNavigation(GroupsList);
