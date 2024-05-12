import PouchDB from 'pouchdb'
import pouchFind from 'pouchdb-find'

PouchDB.plugin(pouchFind)

export class Database {
	constructor(dbName) {
		this.db = new PouchDB(dbName)
	}

	async createDoc(doc) {
		try {
			const response = await this.db.post(doc)
			return { success: true, data: response } // `response` should include `ok: true`
		} catch (error) {
			return { success: false, error }
		}
	}

	async getDoc(id) {
		try {
			const doc = await this.db.get(id)
			return { success: true, data: doc }
		} catch (error) {
			return { success: false, error }
		}
	}

	async updateDoc(doc) {
		try {
			const response = await this.db.put(doc)
			console.log('Update response:', response) // Log to see the actual response
			return { success: true, data: response }
		} catch (error) {
			console.error('Update error:', error) // Log errors
			return { success: false, error }
		}
	}

	async deleteDoc(id) {
		try {
			const doc = await this.db.get(id)
			const response = await this.db.remove(doc)
			return { success: true, data: response }
		} catch (error) {
			return { success: false, error }
		}
	}
}
