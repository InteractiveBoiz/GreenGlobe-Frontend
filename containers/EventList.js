import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { List } from '@ant-design/react-native';
const Item = List.Item;

const style = {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#fff',
  };

class EventList extends React.Component {
    render() {
        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: '#f5f5f9' }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
            >
                <List renderHeader={'basic'}>
                    <Item data-seed="logId">
                        hello there
                    </Item>
                </List>
            </ScrollView>
        )
    }
} 

export default EventList