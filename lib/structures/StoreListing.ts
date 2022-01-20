import util from 'util';
import { IAPIStoreListing, IAPIStorePrice } from "../interfaces/API";

export class StoreListing implements IAPIStoreListing {

	private _data: IAPIStoreListing;

	constructor(api_obj: IAPIStoreListing) {
		this._data = api_obj;
	}

	/**
	 * The ID of the listing.
	 */
	get id(): string {
		return this._data.id;
	}

	/**
	 * The name of the item.
	 */
	get name(): string {
		return this._data.name;
	}

	/**
	 * A short summary of the item.
	 */
	get summary(): string {
		return this._data.summary;
	}

	/**
	 * The description of the item.
	 */
	get description(): string {
		return this._data.description;
	}

	/**
	 * Wether this is a new item in the store.
	 */
	get new(): boolean {
		return this._data.new;
	}

	/**
	 * The URL to an image preview of the item. This can be undefined.
	 */
	get preview(): string | undefined {
		return this._data.preview;
	}

	/**
	 * An array of prices for the item.
	 */
	get prices(): IAPIStorePrice[] {
		return this._data.prices || [];
	}

	/**
	 * An array of categories the item is in.
	 */
	get categories(): string[] {
		return this._data.categories || [];
	}

	/**
	 * An array of tags of the item.
	 */
	get tags(): string[] {
		return this._data.tags || [];
	}

	toString() {
		return `[StoreListing: ${this.id}]`;
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			summary: this.summary,
			description: this.description,
			new: this.new,
			preview: this.preview,
			prices: this.prices,
			categories: this.categories,
			tags: this.tags
		};
	}

	[util.inspect.custom]() {
		return this.toJSON();
	}

}