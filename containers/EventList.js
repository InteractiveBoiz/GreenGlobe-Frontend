import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { List } from '@ant-design/react-native';
import { useQuery, gql } from '@apollo/client';
const Item = List.Item;

const style = {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#fff',
  };

const GET_EVENTS = gql`
{
    events{
        id
        isPublicEvent
        isOrganized
        eventActivity
        eventName
        eventDescription
        eventRequirements
    }
}
`;

//export default () => {
    /*const { loading, error, data } = useQuery(GET_EVENTS);

    if (loading) return (<View><Text>Loading...</Text></View>)
    if (error) return (<View><Text>Error...</Text></View>)
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
        >
            <List renderHeader={'basic'}>
                {data.events.map(({ id, eventName }) => (
                    <Item data-seed="logId">
                        <Text>{id}: {eventName}</Text>
                    </Item>
                ))}
            </List>
        </ScrollView>
    )*/
//    return (<View><Text>Hello</Text></View>)
//} 

/*class EventList extends React.Component {
    render() {
      return (
        <View style={{alignItems: 'center', top: 50}}>
          <Text>Hello</Text>
        </View>
      );
    }
}*/

const EventList = () => {
    const { loading, error, data } = useQuery(GET_EVENTS);
    console.log(error)

    if (loading) return (<View><Text>Loading...</Text></View>)
    if (error) return (<View><Text>Error...</Text></View>)

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
        >
            <List renderHeader={'basic'}>
                {data.events.map(({ id, eventName }) => (
                    <Item data-seed="logId">
                        <Text>{id}: {eventName}</Text>
                    </Item>
                ))}
            </List>
        </ScrollView>
    )
}
export default EventList