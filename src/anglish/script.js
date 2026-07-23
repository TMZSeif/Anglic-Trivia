import wordbook from "./wordbook";
import { singulariseThenPluralise, pluralise, presentContinuous, toPastTense, toPresentTenseThenPastTense, isVowel } from "./grammar_engine";

function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


const translate = function (text) {

	// set up the constants.
	const vowels = ['a', 'e', 'i', 'o', 'u'];
	const specialCharacters = /[ `!@#$%^&*,.;?~()]/;

	// Set up the variables.
	let inputWords = text;
	let outputText = ""
	let keys = [];
	let specialCharactersIndex = {};
	let textSize = 0;
	let outputTextSize = 0;


	// Split the English text into separate words based on the space character
	inputWords = inputWords.split(" ")

	textSize = inputWords.length
	// Check if word contains special characters, if so handle them.
	inputWords.forEach((word, index) => {
		word = word.trim();

		if (specialCharacters.test(word)) {
			let character = word.match(specialCharacters);
			Object.assign(specialCharactersIndex, {
				[index]: [character]
			});
			inputWords[index] = word.replace(/[ `!@#$%^&*,.;?~()]/g, '');

		}

	});
	for (var k in specialCharactersIndex) keys.push(k);

	/* Check for special words (words that have spaces in them) by adding the index, plus word after it and checking for them in the wordbook file, if that didn't work check to see if the index and the TWO words after it exist....yeah it's retarded I know */

	// I'm 99% sure there must be a better way to do this.


	inputWords.forEach((word, index) => {

		let twoWords = inputWords[index] + " " + inputWords[index + 1];
		let threeWords = inputWords[index] + " " + inputWords[index + 1] + " " + inputWords[index + 2];
		// value by key (English->Anglish)
		if (twoWords.toLowerCase() in wordbook) {
			inputWords[index] = wordbook[twoWords.toLowerCase()];
			if (twoWords === twoWords.toUpperCase()) {
				inputWords[index] = inputWords[index].toUpperCase()
			}
			else if (twoWords[0] === twoWords[0].toUpperCase()) {
				inputWords[index] = inputWords[index][0].toUpperCase() + inputWords[index].slice(1)
			}
			inputWords[index + 1] = "";

		} else if (threeWords.toLowerCase() in wordbook) {
			inputWords[index] = wordbook[threeWords.toLowerCase()];
			if (threeWords === threeWords.toUpperCase()) {
				inputWords[index] = inputWords[index].toUpperCase()
			}
			else if (threeWords[0] === threeWords[0].toUpperCase()) {
				inputWords[index] = inputWords[index][0].toUpperCase() + inputWords[index].slice(1)
			}
			inputWords[index + 1] = "";
			inputWords[index + 2] = "";

		}

	});


	// Check if an English word has an Anglish translation, if so swap the English word with its Anglish match.

	inputWords.forEach((word, index) => {
		word = word.trim();
		if (/[a-zA-Z]/.test(word) !== true) {
			inputWords[index] = word
			outputTextSize++
			return
		}
		// value by key (English->Anglish)
		if (word.toLowerCase() in wordbook) {
			inputWords[index] = wordbook[word.toLowerCase()];
			if (word === word.toUpperCase()) {
				inputWords[index] = inputWords[index].toUpperCase()
			}
			else if (word[0] === word[0].toUpperCase()) {
				inputWords[index] = inputWords[index][0].toUpperCase() + inputWords[index].slice(1)
			}
		} else if (singulariseThenPluralise(word.toLowerCase()) !== undefined && singulariseThenPluralise(word.toLowerCase()) !== "") {
			inputWords[index] = singulariseThenPluralise(word.toLowerCase());
			if (word === word.toUpperCase()) {
				inputWords[index] = inputWords[index].toUpperCase()
			}
			else if (word[0] === word[0].toUpperCase()) {
				inputWords[index] = inputWords[index][0].toUpperCase() + inputWords[index].slice(1)
			}
		} else if (toPresentTenseThenPastTense(word.toLowerCase()) !== undefined) {
			inputWords[index] = toPresentTenseThenPastTense(word.toLowerCase());
			if (word === word.toUpperCase()) {
				inputWords[index] = inputWords[index].toUpperCase()
			}
			else if (word[0] === word[0].toUpperCase()) {
				inputWords[index] = inputWords[index][0].toUpperCase() + inputWords[index].slice(1)
			}
		} else if (presentContinuous(word.toLowerCase()) !== undefined) {
			inputWords[index] = presentContinuous(word.toLowerCase());
			if (word === word.toUpperCase()) {
				inputWords[index] = inputWords[index].toUpperCase()
			}
			else if (word[0] === word[0].toUpperCase()) {
				inputWords[index] = inputWords[index][0].toUpperCase() + inputWords[index].slice(1)
			}
		} else {
			inputWords[index] = word
			outputTextSize++;
		}
	});


	// Decide if "a" or "an" should be used.
	inputWords.forEach((word, index) => {

		if (word.toLowerCase() === "an" || word.toLowerCase() === "a") {

			if (inputWords[index + 1] !== undefined && vowels.includes(inputWords[index + 1][0])) {

				inputWords[index] = "an"

			} else {

				inputWords[index] = "a"

			}
		}

	});


	// Re-add special characters according to their position in the original text, if the character was the first, it's added to the beginning, else it is added to the end of the word.
	inputWords.forEach((word, index) => {

		if (index in keys) {

			word = inputWords[keys[index]];
			let wordWithCharacters = word;

			if (specialCharactersIndex[keys[index]][0]['index'] === 0) {

				wordWithCharacters = [...word];
				if (wordWithCharacters[0] === undefined) wordWithCharacters.push("")
				wordWithCharacters[0] = specialCharactersIndex[keys[index]][0][0] + wordWithCharacters[0];
				wordWithCharacters = wordWithCharacters.join('');

			} else {

				wordWithCharacters += specialCharactersIndex[keys[index]][0][0];
			}

			inputWords[keys[index]] = wordWithCharacters;

		}
	});

	// Parse the translated words into a string, and add spacing between words.
	inputWords.forEach((word, index) => {
		index == 0 ? outputText += word : outputText += " " + word;
	});

	outputText = outputText.replace(/\s{2,}/g, " ");

	return outputText
}

export default translate