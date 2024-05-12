export function handleError(error) {
	console.error('Database Error:', error)
	return { success: false, error: { message: error.message, status: error.status } }
}

export function handleSuccess(data) {
	return { success: true, data }
}
