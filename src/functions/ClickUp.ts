import { DiscordAPIError } from 'discord.js';
import got from 'got';
import { Http2ServerRequest } from 'http2';
import GuideBot from '../ClientClass';
// const routes  from'./clickup/routes
import config from '../config';
import { Folder } from '../config/Folder';
import { Space } from '../config/Space';
import { Task } from '../config/Task';
import * as Discord from 'discord.js';

import Authorization from './clickup/Authorization';
import Checklists from './clickup/Checklists';
import Comments from './clickup/Comments';
import Folders from './clickup/Folders';
import Goals from './clickup/Goals';
import KeyResults from './clickup/KeyResults';
import Lists from './clickup/Lists';
import Spaces from './clickup/Spaces';
import Tasks from './clickup/Tasks';
import Teams from './clickup/Teams';
import Views from './clickup/Views';
import Webhooks from './clickup/Webhooks';

export default class Clickup {
	_baseUrl: string;
	_token: any;
	_headers: { authorization: any; 'content-type': string };
	_service: any;
	client: GuideBot;

	authorization: Authorization;
	checklists: Checklists;
	comments: Comments;
	folders: Folders;
	goals: Goals;
	keyResults: KeyResults;
	lists: Lists;
	spaces: Spaces;
	tasks: Tasks;
	teams: Teams;
	views: Views;
	webhooks: Webhooks;

	/**
	 *  Creates a client instance that connects to the Clickup API
	 *
	 * @constructor
	 * @param {String} token Clickup API Access Token
	 */
	constructor(_client) {
		this.client = _client;
		this._baseUrl = 'https://api.clickup.com/api/v2';
		this._token = config.clickupToken;
		this._headers = {
			authorization: this._token,
			'content-type': 'application/json',
		};
		this._service = this._createGotInstance();

		// // pull in all routes
		this.authorization = new Authorization(this);
		this.checklists = new Checklists(this);
		this.comments = new Comments(this);
		this.folders = new Folders(this);
		this.goals = new Goals(this);
		this.keyResults = new KeyResults(this);
		this.lists = new Lists(this);
		this.spaces = new Spaces(this);
		this.tasks = new Tasks(this);
		this.teams = new Teams(this);
		this.views = new Views(this);
		this.webhooks = new Webhooks(this);
	}

	async init() {
		this.client.logger.log('ClickUp Ready');
		// this.getAllTasks();

		// let hook = await this.webhooks.create();
		// console.log('hook hook hook hook hook ');
		// console.log(hook);
	}

	async getAllTasks() {
		let get = await this.spaces.getFolders('1280032');
		let folders: Folder[] = get.body.folders;

		// console.log(folders[0].lists[0].name);

		// folders.forEach((folder) => {
		// 	folder.lists.forEach((list) => {
		// 		console.log(list.id);
		// 		let gettasks = await this.lists.getTasks('1280032');
		// 	});
		// });
		let num = 0;

		for (const folder of folders) {
			console.log(`	FOLDER NAME ${folder.name}  `);

			for (const list of folder.lists) {
				let gettasks = await this.lists.getTasks(list.id);
				console.log(`		LIST NAME ${list.name}  `);

				let tasks: Task[] = gettasks.body.tasks;
				for (const task of tasks) {
					num++;
					console.log(`			${num} TASK NAME ${task.name}  `);

					// break;
				}
			}
		}
	}

	update(_message: Discord.Message) {
		this.client.logger.log(_message.embeds[0].url);
		this.client.logger.log(_message.embeds[0].description);
		/**
		 * Local  -->   ClickUp
		 * tasks  <--   tasks
		 */
	}

	/**
	 * Creates a got instance with clickup default config
	 * @private
	 */
	_createGotInstance() {
		return got.extend({
			prefixUrl: this._baseUrl,
			headers: this._headers,
			responseType: 'json',
		});
	}

	/**
	 * Converts parameters for a request to URLSearchParams
	 *
	 * @param {Object} params parameters to be converted
	 * @private
	 */
	// eslint-disable-next-line class-methods-use-this
	_buildSearchParams(params) {
		return new URLSearchParams(Object.entries(params));
	}

	/**
	 * Makes an HTTP GET request
	 *
	 * @param {Object} options  Options to pass to the api call
	 * @param {String} options.endpoint The endpoint to make a request to
	 * @param {Object} options.params The parameters to add to the endpoint
	 */
	async get({ endpoint, params = {} }) {
		const searchParams = this._buildSearchParams(params);
		return this._service.get(endpoint, { searchParams });
	}

	/**
	 * Makes an HTTP POST request
	 *
	 * @param {Object} options  Options to pass to the api call
	 * @param {String} options.endpoint The endpoint to make a request to
	 * @param {Object} options.params The parameters to add to the endpoint
	 * @param {Object} options.body The data to send in the body of the request
	 * @param {Object} options.headers The headers to send along with the request
	 */
	async post({ endpoint, params = {}, json = {}, body = {}, headers = {} }) {
		const searchParams = this._buildSearchParams(params);

		const options = {
			searchParams,
			headers,
		};

		if (Object.getOwnPropertyNames(json).length) {
			options.json = json;
		} else {
			options.body = body;
		}

		// console.log(`endpoint ${endpoint}`);
		// console.log(`options ${options}`);
		// console.log(options);

		return this._service.post(endpoint, options);
	}

	/**
	 * Makes an HTTP PUT request
	 *
	 * @param {Object} options  Options to pass to the api call
	 * @param {String} options.endpoint The endpoint to make a request to
	 * @param {Object} options.params The parameters to add to the endpoint
	 * @param {Object} options.body The data to send in the body of the request
	 */
	async put({ endpoint, params = {}, json = {}, body = {} }) {
		const searchParams = this._buildSearchParams(params);

		const options = {
			searchParams,
		};

		if (Object.getOwnPropertyNames(json).length) {
			options.json = json;
		} else {
			options.body = body;
		}

		return this._service.put(endpoint, options);
	}

	/**
	 * Makes an HTTP DELETE request
	 *
	 * @param {Object} options  Options to pass to the api call
	 * @param {String} options.endpoint The endpoint to make a request to
	 * @param {Object} options.params The parameters to add to the endpoint
	 */
	async delete({ endpoint, params = {} }) {
		const searchParams = this._buildSearchParams(params);
		return this._service.delete(endpoint, { searchParams });
	}
}
