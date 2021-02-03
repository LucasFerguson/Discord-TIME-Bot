import got from 'got';
import * as Discord from 'discord.js';

import GuideBot from '../ClientClass';
import * as tokens from '../../tokens/token.lock.json';
import { Folder } from '../config/Folder';

import Authorization from './clickupLib/Authorization';
import Checklists from './clickupLib/Checklists';
import Comments from './clickupLib/Comments';
import Folders from './clickupLib/Folders';
import Goals from './clickupLib/Goals';
import KeyResults from './clickupLib/KeyResults';
import Lists from './clickupLib/Lists';
import Spaces from './clickupLib/Spaces';
import Tasks from './clickupLib/Tasks';
import Teams from './clickupLib/Teams';
import Views from './clickupLib/Views';
import Webhooks from './clickupLib/Webhooks';

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
		this._token = tokens.clickupToken;
		this._headers = {
			authorization: this._token,
			'content-type': 'application/json',
		};
		this._service = this._createGotInstance();

		// pull in all routes
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
		// this.client.logger.log('Loading Function: ClickUp Ready (:');
	}

	async getAllTasks() {
		let get = await this.spaces.getFolders('1280032');
		let folders: Folder[] = get.body.folders;

		let num = 0;
		let returnString = '';

		for (const folder of folders) {
			returnString += `	FOLDER NAME ${folder.name}  \n`;

			// for (const list of folder.lists) {
			// 	let gettasks = await this.lists.getTasks(list.id);
			// 	returnString += `		LIST NAME ${list.name}  \n`;

			// let tasks: Task[] = gettasks.body.tasks;
			// for (const task of tasks) {
			// 	num++;
			// 	returnString += `			${num} TASK NAME ${task.name}  \n`;

			// 	// break;
			// }
			// }
		}
		console.log('Done');

		return returnString;
	}

	update(_message: Discord.Message) {
		// this.client.logger.log(_message.embeds[0].url);
		// this.client.logger.log(_message.embeds[0].description);
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
			//@ts-ignore
			options.json = json;
		} else {
			//@ts-ignore
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
			//@ts-ignore
			options.json = json;
		} else {
			//@ts-ignore
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
