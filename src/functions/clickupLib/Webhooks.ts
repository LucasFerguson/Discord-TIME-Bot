// @ts-nocheck

import Clickup from '../ClickUp';

export default class Webhooks {
	_client: Clickup;
	route: string;

	/**
	 * @constructor
	 * @param {Client} client A client instance
	 */
	constructor(client) {
		this._client = client;
		this.route = 'webhook';
	}

	// /**
	//  * Update a webhook
	//  *
	//  * @param {String} webhookId The webhook id
	//  * @param {Object} data The webhook data
	//  */
	// async create() {
	// 	return this._client.post({
	// 		endpoint: `team/1230384/${this.route}`,
	// 		body: '',
	// 		json: {
	// 			endpoint: ``,
	// 			events: [
	// 				'taskCreated',
	// 				'taskUpdated',
	// 				'taskDeleted',
	// 				'listCreated',
	// 				'listUpdated',
	// 				'listDeleted',
	// 				'folderCreated',
	// 				'folderUpdated',
	// 				'folderDeleted',
	// 				'spaceCreated',
	// 				'spaceUpdated',
	// 				'spaceDeleted',
	// 				'goalCreated',
	// 				'goalUpdated',
	// 				'goalDeleted',
	// 				'keyResultCreated',
	// 				'keyResultUpdated',
	// 				'keyResultDeleted',
	// 			],
	// 		},
	// 	});
	// }

	/**
	 * Update a webhook
	 *
	 * @param {String} webhookId The webhook id
	 * @param {Object} data The webhook data
	 */
	async update(webhookId, data) {
		return this._client.put({
			endpoint: `${this.route}/${webhookId}`,
			json: data,
		});
	}

	/**
	 * Delete a webhook
	 *
	 * @param {String} webhookId The webhook id
	 */
	async delete(webhookId) {
		return this._client.delete({
			endpoint: `${this.route}/${webhookId}`,
		});
	}
}
