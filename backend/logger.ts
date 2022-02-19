class Logger {
	public write(logData: string | Error) {
		console.log(logData);
	}
}

const logger = new Logger();

export { logger };