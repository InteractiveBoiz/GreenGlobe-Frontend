import React from 'react';
import { gql } from '@apollo/client';

export const ATTEND_EVENT = gql`
	mutation attendEvent($userId: ID!, $eventId: ID!) {
		attendEvent(userId: $userId, eventId: $eventId) {
			attendees
		}
	}
`;

export const CREATE_EVENT = gql`
	mutation createEvent($event: EventInput!) {
		createEvent(event: $event) {
			id
			hostId
			isPublicEvent
			isOrganized
			eventActivity
			eventName
			eventDescription
			eventRequirements
			eventDate
			eventCreated
			eventEnd
			attendees
			map {
				meetUpPosition {
					latitude
					longitude
				}
				areaOfInterest {
					latitude
					longitude
				}
				exitPosition {
					latitude
					longitude
				}
			}
			chatId
		}
	}
`;
