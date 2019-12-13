import React from 'react';
import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
	{
		events {
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
		}
	}
`;

export const ATTENDING_EVENTS = gql`
	query attendingEvents($userId: ID!) {
		events: attendingEvents(userId: $userId) {
			id
			eventName
			eventDescription
		}
	}
`;

export const HOSTING_EVENTS = gql`
	query hostingEvents($userId: ID!) {
		events: hostingEvents(userId: $userId) {
			id
			eventName
			eventDescription
		}
	}
`;
