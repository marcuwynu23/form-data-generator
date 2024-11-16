# FormDataGenerator

`FormDataGenerator` is a JavaScript class designed to simplify the creation and management of `FormData` objects, allowing for easy handling of file uploads and chunked data in both Node.js and browser environments.

## Features

- Create and manage `FormData` objects.
- Set individual items or chunked items for file uploads.
- Retrieve items as arrays or individual items.
- Works seamlessly in both Node.js and browser environments.

## Installation

### Node.js

If you are using Node.js, install the `form-data` package:

```bash
npm install form-data
```

### Browser

In a browser environment, simply include the script in your HTML file:

```html
<script src="path/to/FormDataGenerator.js"></script>
```


### Usage
#### Importing the Class

In Node.js, you can import the FormDataGenerator class as follows:

```javascript
const { FormDataGenerator } = require('./path/to/FormDataGenerator');
```

In a browser, you can directly use FormDataGenerator after including the script.





#### Creating a FormDataGenerator Instance

You can create an instance of FormDataGenerator like this:

```javascript
const formDataGenerator = new FormDataGenerator(new FormData());
```

#### Setting Items

You can set items in the FormData object using the setItem method:

```javascript
formDataGenerator.setItem('username', 'john_doe');
```


#### Setting Chunked Items

For file uploads, you can use the setChunkItem method to handle large files in chunks:

```javascript
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];
const options = { limit: 5 }; // Set chunk size limit in MB

formDataGenerator.setChunkItem('file', file, options);
```
#### Retrieving Items

You can retrieve individual items or all items:

```javascript
const username = formDataGenerator.getItem('username');
console.log(username); // Output: john_doe

const itemsArray = formDataGenerator.getItemsAsArray();
console.log(itemsArray); // Output: [{ name: 'username', value: 'john_doe' }, ...]

const items = formDataGenerator.getItems();
console.log(items); 
```

### API

##### `constructor(formData?)`

- **Parameters**: 
  - `formData` (optional): An existing `FormData` object to initialize.

##### `setItem(name, value)`

- **Parameters**:
  - `name`: The name of the item to set.
  - `value`: The value to associate with the name.

##### `setChunkItem(name, value, options)`

- **Parameters**:
  - `name`: The name of the item to set.
  - `value`: The `File` or buffer object to be chunked.
  - `options`: An object containing `limit` (in MB) for chunk size.

##### `getItem(name)`

- **Parameters**:
  - `name`: The name of the item to retrieve.
- **Returns**: The value associated with the specified name.

##### `getItemsAsArray()`

- **Returns**: An array of all items in the `FormData` object.

##### `getItems()`

- **Returns**: An array of objects containing `name` and `value` pairs for all items.


### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### Acknowledgments

**form-data** for handling form data in Node.js.
**MDN Web Docs** for documentation on the FormData API.



### How to Use

1. **Create a new file**: Open your text editor or IDE.
2. **Copy the content**: Copy the above Markdown content.
3. **Paste it into the file**: Paste the content into the new file.
4. **Save the file**: Save the file with the name `README.md`.

This will create a well-structured README file for your `FormDataGenerator` class. You can adjust any sections as needed to fit your project's specific details.