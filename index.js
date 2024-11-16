let FormData;

if (typeof window === "undefined") {
	// Node.js environment
	FormData = require("form-data");
} else {
	// Browser environment
	FormData = window.FormData;
}

class FormDataGenerator {
	constructor(formData) {
		this._formData = formData || new FormData(); // Initialize with a new FormData if none provided
	}

	__setFormData(formData) {
		this._formData = formData;
	}

	getFormData() {
		return this._formData;
	}

	setItem(name, value) {
		let currentformData = this.getFormData();
		currentformData.set(name, value);
		this.__setFormData(currentformData);
	}

	setChunkItem(name, value, options) {
		let currentformData = this.getFormData();
		const chunkSize = options.limit * 1024 * 1024;

		if (value instanceof File) {
			const totalChunks = Math.ceil(value.size / chunkSize);
			const dzuuid = name;

			for (let i = 0; i < totalChunks; i++) {
				const start = i * chunkSize;
				const end = Math.min(start + chunkSize, value.size);
				const chunk = value.slice(start, end);
				const chunkSizeMB = (chunk.size / (1024 * 1024)).toFixed(2);
				console.log(`${value.name} Chunk ${i + 1}/${totalChunks} size: ${chunkSizeMB} MB`);
				currentformData.append(name, chunk, value.name);
				currentformData.append("dzuuid", dzuuid);
				currentformData.append("dzchunkindex", `${i}`);
				currentformData.append("dztotalchunkcount", `${totalChunks}`);
			}
		} else if (value && typeof value === "object") {
			const buffer = value.buffer;
			const totalChunks = Math.ceil(buffer.length / chunkSize);
			const dzuuid = name;
			const chunks = [];

			for (let i = 0; i < totalChunks; i++) {
				const start = i * chunkSize;
				const end = Math.min(start + chunkSize, buffer.length);
				chunks.push(buffer.slice(start, end));
			}

			for (let i = 0; i < totalChunks; i++) {
				const chunk = chunks[i];
				const chunkSizeMB = (chunk.length / (1024 * 1024)).toFixed(2);
				console.log(`Chunk ${i + 1}/${totalChunks} size: ${chunkSizeMB} MB`);
				currentformData.append(name, chunk, value.originalname);
				currentformData.append("dzuuid", dzuuid);
				currentformData.append("dzchunkindex", `${i}`);
				currentformData.append("dztotalchunkcount", `${totalChunks}`);
			}
		}
		this.__setFormData(currentformData);
	}

	getItem(name) {
		return this.getFormData().get(name);
	}

	getItemsAsArray() {
		const items = this.getItems();
		return items.map(({ name, value }) => ({ name, value: value.toString() }));
	}

	getItems() {
		const items = [];
		this.getFormData().forEach((value, name) => {
			items.push({ name, value });
		});
		return items;
	}
}

// CommonJS export
if (typeof module !== "undefined" && module.exports) {
	module.exports = { FormDataGenerator };
}

// ES6 export (for Node.js with ES6 modules and browsers)
if (typeof exports === "object" && typeof module !== "undefined") {
	// This is for Node.js with ES6 modules
	export default { FormDataGenerator };
} else if (typeof window !== "undefined" && window.document) {
	// This is for browsers
	window.FormDataGenerator = FormDataGenerator;
}
