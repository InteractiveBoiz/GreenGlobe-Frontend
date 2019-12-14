import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Flex, WingBlank } from '@ant-design/react-native';

const CreateMapButtonContainer = (props) => {
	return (
		<WingBlank style={styles.overlay}>
			<Button
				size="small"
				style={styles.buttonStyle}
				onPress={props.onSettingStartLocationPressed}
				disabled={props.settingAreaLocation || props.settingEndLocation}
			>
				{props.settingStartLocation ? `Finish` : `Set Start Location`}
			</Button>
			<Button
				size="small"
				style={styles.buttonStyle}
				onPress={props.onSettingAreaLocationPressed}
				disabled={props.settingStartLocation || props.settingEndLocation}
			>
				{props.settingAreaLocation ? `Finish` : `Set Area`}
			</Button>
			<Button
				size="small"
				style={styles.buttonStyle}
				onPress={props.onSettingEndLocationPressed}
				disabled={props.settingStartLocation || props.settingAreaLocation}
			>
				{props.settingEndLocation ? `Finish` : `Set End Location`}
			</Button>
			
		</WingBlank>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		bottom: 60,
		flexDirection: 'row'
		//backgroundColor: 'rgba(255, 255, 255, 1)'
	},
	buttonStyle: {
		paddingLeft: 10,
		paddingRight: 10
	}
});

export default CreateMapButtonContainer;
