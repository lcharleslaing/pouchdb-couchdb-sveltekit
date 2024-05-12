import { Database } from '../src/database.js' // Adjust the path as necessary

describe('Database CRUD operations', () => {
	let db

	beforeAll(() => {
		db = new Database('testdb')
	})

	afterAll(async () => {
		if (db && db.db) {
			await db.db.destroy() // Ensure db is defined and has the 'db' property
		}
	})

	test('fails to create document with invalid data', async () => {
		const response = await db.createDoc(null) // Assuming null is invalid
		expect(response.success).toBe(false)
		expect(response.error).toBeDefined()
	})

	test('create document', async () => {
		const doc = { name: 'New Document', age: 25 }
		const response = await db.createDoc(doc)
		expect(response.success).toBe(true)
		expect(response.data.ok).toBe(true) // Ensure that the operation was successful
	})

	test('read document', async () => {
		const doc = { name: 'Read Document', age: 30 }
		const created = await db.createDoc(doc)
		const response = await db.getDoc(created.data.id)
		expect(response.success).toBe(true)
		expect(response.data._id).toEqual(created.data.id) // Check if the IDs match
	})

	test('update document', async () => {
		const doc = { name: 'Update Test', age: 35 }
		const created = await db.createDoc(doc)
		expect(created.success).toBe(true)

		// Explicitly include _id and _rev for the update
		const updatedDoc = {
			...created.data,
			_id: created.data.id, // Ensure the _id is correctly referenced
			_rev: created.data.rev, // Ensure the _rev is correctly referenced
			age: 36,
		}

		console.log('Updating document with:', updatedDoc)

		const response = await db.updateDoc(updatedDoc)
		expect(response.success).toBe(true)
		if (!response.success) {
			console.error('Failed update:', response.error) // Log error if update fails
		}
		expect(response.data.ok).toBe(true)
	})

	test('delete document', async () => {
		const doc = { name: 'Delete Document', age: 40 }
		const created = await db.createDoc(doc)
		const response = await db.deleteDoc(created.data.id)
		expect(response.success).toBe(true)
		expect(response.data.ok).toBe(true) // Ensure that the deletion was successful
	})
})
