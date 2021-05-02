class ContactDataUtil {
	static formatAsMacapaClientName(name: string): string {
		const newName = this.removeAllUnecessaryNameCharacters(name);
		return newName.toUpperCase();
	}

	static formatAsMacapaClientNumber(number: string): string {
		const clearNumber = this.removeAllButNumbers(number);
		const newNumber = clearNumber.replace(
			/^(\d{2})(\d{2})(\d{5})(\d{4})/g,
			'+$1 ($2) $3-$4',
		);
		return newNumber;
	}

	static formatAsVarejaoClientName(name: string): string {
		const newName = this.removeAllUnecessaryNameCharacters(name);
		return newName.toUpperCase();
	}

	static formatasVarejaoClientNumber(number: string): string {
		return this.removeAllButNumbers(number);
	}

	private static removeAllUnecessaryNameCharacters(phrase: string): string {
		const onlyLetters = phrase
			.toLowerCase()
			.replace(/[^a-záàãâçéèêíìîóòôõúù]+|\s+/gim, ' ');
		const withoutAbrev = onlyLetters
			.replace(/srta /g, '')
			.replace(/sra /g, '')
			.replace(/sr /g, '')
			.replace(/dr /g, '')
			.replace(/dra /g, '');

		return withoutAbrev;
	}

	private static removeAllButNumbers(numbers: string): string {
		return numbers.replace(/\D/g, '');
	}
}

export { ContactDataUtil };
