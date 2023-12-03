'use strict';
const uuidv4 = require('./uuidv4');
// Generate a v4 (random) UUID

var codebook = [];
codebook[0] = 'a';
codebook[1] = 'b';
codebook[2] = 'c';
codebook[3] = 'd';
codebook[4] = 'e';
codebook[5] = 'f';
codebook[6] = 'g';
codebook[7] = 'h';
codebook[8] = 'i';
codebook[9] = 'j';
codebook[10] = 'k';
codebook[11] = 'l';
codebook[12] = 'm';
codebook[13] = 'n';
codebook[14] = 'o';
codebook[15] = 'p';
codebook[16] = 'q';
codebook[17] = 'r';
codebook[18] = 's';
codebook[19] = 't';
codebook[20] = 'u';
codebook[21] = 'v';
codebook[22] = 'w';
codebook[23] = 'x';
codebook[24] = 'y';
codebook[25] = 'z';
codebook[26] = 'A';
codebook[27] = 'B';
codebook[28] = 'C';
codebook[29] = 'D';
codebook[30] = 'E';
codebook[31] = 'F';
codebook[32] = 'G';
codebook[33] = 'H';
codebook[34] = 'I';
codebook[35] = 'J';
codebook[36] = 'K';
codebook[37] = 'L';
codebook[38] = 'M';
codebook[39] = 'N';
codebook[40] = 'O';
codebook[41] = 'P';
codebook[42] = 'Q';
codebook[43] = 'R';
codebook[44] = 'S';
codebook[45] = 'T';
codebook[46] = 'U';
codebook[47] = 'V';
codebook[48] = 'W';
codebook[49] = 'X';
codebook[50] = 'Y';
codebook[51] = 'Z';
codebook[52] = '0';
codebook[53] = '1';
codebook[54] = '2';
codebook[55] = '3';
codebook[56] = '4';
codebook[57] = '5';
codebook[58] = '6';
codebook[59] = '7';
codebook[60] = '8';
codebook[61] = '9';
codebook[62] = '`';
codebook[63] = '~';
codebook[64] = '!';
codebook[65] = '@';
codebook[66] = '#';
codebook[67] = '$';
codebook[68] = '%';
codebook[69] = '^';
codebook[70] = '&';
codebook[71] = '*';
codebook[72] = '(';
codebook[73] = ')';
codebook[74] = '-';
codebook[75] = '=';
codebook[76] = '_';
codebook[77] = '+';
codebook[78] = '[';
codebook[79] = ']';
codebook[80] = '{';
codebook[81] = '}';
codebook[82] = '|';
codebook[83] = '\\';
codebook[84] = ';';
codebook[85] = ':';
codebook[86] = "'";
codebook[87] = '"';
codebook[88] = ',';
codebook[89] = '.';
codebook[90] = '<';
codebook[91] = '>';
codebook[92] = '/';
codebook[93] = '?';
codebook[94] = ' ';
codebook[95] = '\n';
codebook[96] = '\r';
codebook[97] = '\t';
codebook[98] = '–';
codebook[99] = '—';

// Encode text using the given codebook.
// The codebook is an array of characters.
// The encoded text is an array of numbers.
// Each number is the index of the codebook character.
// If the codebook character is not found, the number is not added to the encoded text.

function encode(text) {
	let encoded = [];

	for (let i = 0; i < text.length; i++) {
		const codebookIndex = codebook.indexOf(text[i]);

		if (codebookIndex !== -1) {
			encoded[i] = codebookIndex.toString().padStart(2, '0');
		} else {
			console.error('Could not encode character: ' + text[i]);
		}
	}

	return encoded.join('');
}

// This code accepts a string of numbers and converts them into the corresponding
// characters from the codebook. The codebook is an array of characters.

function decode(code) {
	// code must be a string
	if (typeof code !== 'string') {
		console.error('Code must be a string');
	}
	// code must be an even number of characters
	if (code.length % 2 !== 0) {
		console.error('Code must be an even number of characters');
	}
	// split code into pairs of characters
	var codeLength = code.length / 2;
	code = code.match(/.{1,2}/g);
	var text = [];
	for (var i = 0; i < codeLength; i++) {
		// convert code character to a number
		code[i] *= 1;
		// code character must be in range
		if (code[i] < 0 || code[i] > 25) {
			// console.error('Code character out of range');
		}
		// get corresponding character from codebook
		text[i] = codebook[code[i]];
	}
	return text.join('');
}

/* The code above does the following, explained in English:
1. The function takes the message, the key, and the mode (encrypt or decrypt) as arguments.
2. If the message or key are empty, it returns an error.
3. It then encodes the key into a code (see the encode() function below).
4. If the mode is 'encrypt' then it encodes the message into a code (see the encode() function below).
5. If the mode is 'decrypt' then it checks if the message is a number. If it is, then it sets the codeMessage to the message. If it isn't, it returns an error.
6. If the codeKey is shorter than the codeMessage, and keyRepetition is true, it will repeat the key until it is long enough. Otherwise it will return an error.
7. It then splits the codeMessage and codeKey into arrays of single numbers.
8. It then sets the codeOutput variable to an empty array.
9. It then loops through the codeMessage array.
10. It then multiplies the number at the current index in the codeMessage array by 1 (to convert it into a number, rather than a string).
11. It then multiplies the number at the current index in the codeKey array by 1 (to convert it into a number, rather than a string).
12. If the mode is 'encrypt', it then adds the codeMessage number to the codeKey number and adds the result to the codeOutput array.
13. If the mode is 'decrypt', it then subtracts the codeKey number from the codeMessage number and adds the result to the codeOutput array.
14. If the result is less than 0, it adds 10 to it.
15. It joins the codeOutput array into a string.
16. If the mode is 'decrypt', it then decodes the output string (see the decode() function below).
17. It then returns the output string. */

function otp(message, key, mode, keyRepetition) {
	// If the message or key is empty, show an error and return the error
	if (message === '' || key === '') {
		var error = 'Error: The message and key must not be be empty.';
		console.error('[crypto.js] ' + error);
		return error;
	}

	// Encode the key
	var codeKey = encode(key);

	// If the mode is encrypt, encode the message
	if (mode == 'encrypt') {
		var codeMessage = encode(message);
	} else if (mode == 'decrypt') {
		// If the mode is decrypt, check the message doesn't contain any non-numbers
		if (!isNaN(message)) {
			var codeMessage = message;
		} else {
			var error = 'Error: When decrypting, the message must only contain numbers.';
			console.error('[crypto.js] ' + error);
			return error;
		}
	}

	// If the key is shorter than the message, either show an error or repeat the key until it's long enough
	if (codeKey.length < codeMessage.length) {
		if (keyRepetition === true) {
			while (codeKey.length < codeMessage.length) {
				codeKey += codeKey;
			}
		} else {
			var error = 'Error: The key is shorter than the message.';
			console.error('[crypto.js] ' + error);
			return error;
		}
	}
	// Convert the codeMessage and codeKey strings into arrays of numbers
	codeMessage = codeMessage.split('');
	codeKey = codeKey.split('');
	var codeOutput = [];

	// Loop through the arrays, add or subtract the numbers depending on the mode, and push the result into the codeOutput array
	for (var i = 0; i < codeMessage.length; i++) {
		codeMessage[i] *= 1;
		codeKey[i] *= 1;
		if (mode == 'encrypt') {
			codeOutput[i] = codeMessage[i] + codeKey[i];
			if (codeOutput[i] > 9) {
				codeOutput[i] -= 10;
			}
		}
		/*
		 * This code converts the message into the output, based on the mode
		 * and the key.
		 */
		if (mode == 'decrypt') {
			codeOutput[i] = codeMessage[i] - codeKey[i];
			if (codeOutput[i] < 0) {
				codeOutput[i] += 10;
			}
		}
	}

	// Convert the codeOutput array into a string
	var outputString = codeOutput.join('');

	// If the mode is decrypt, decode the output string and return it
	if (mode == 'decrypt') {
		return decode(outputString);
	} else {
		// If the mode is encrypt, return the output string
		return outputString;
	}
}

/* The code above does the following, explained in English:
1. Define an "iv" variable as a random uuidv4.
2. Define an "encrypt" function which takes a "plainText" argument.
3. The function checks if the "plainText" argument is null or empty.
4. If so, it returns null.
5. It then defines a "isLonger" variable as false.
6. If the length of the "iv" variable is less than the length of the "plainText" argument, it sets "isLonger" to true.
7. It then logs the value of "isLonger" to the console.
8. It defines a "cipher" variable as the output of the "otp" function, which takes the "plainText" argument, the "iv" variable, the string "encrypt" and the "isLonger" variable as arguments.
9. It then logs the value of "cipher" to the console.
10. It then returns an object with the properties "iv" and "content", both of which are set to the "iv" variable and the "cipher" variable respectively. */

const encrypt = (plainText) => {
	const iv = uuidv4();
	// Check if the plain text is null or empty
	if (plainText === null && plainText.length === 0) return null;
	// Check if the iv is longer than the plain text
	const isLonger = iv.length < plainText.length;
	// Encrypt the plain text
	const cipher = otp(plainText, iv, 'encrypt', isLonger);
	// Return the cipher text
	return {
		iv: iv,
		content: cipher
	};
};

/* The code above does the following, explained in English:
1. Checks if the input is valid (not null or empty, and is an object)
2. Runs the OTP function (see below) with the content and IV of the cipher, and specifies the operation as 'decrypt'
3. Returns the decrypted text */
const decrypt = (cipher) => {
	// Check for empty cipher or invalid input
	if ((cipher === null && cipher.length === 0) || typeof cipher !== 'object') return false;

	const isLonger = cipher.iv.length < cipher.content.length;

	// Decrypt the cipher
	var text = otp(cipher.content, cipher.iv, 'decrypt', isLonger);
	if ((cipher === null && cipher.length === 0) || typeof cipher !== 'object') return false;

	var text = otp(cipher.content, cipher.iv, 'decrypt');
	return text;
};

/* Exporting the functions `encrypt`, `decrypt`, and `otp` so that they can be used in other files. */

module.exports = {
	encrypt,
	decrypt,
	otp
};


// clone list of objects

// The function takes a list as an argument and returns a new list with the same items as the original list
// The function iterates over the original list and maps each item to a new object using Object.assign
// The new object is a copy of the original object and is pushed to the new list
// The function returns the new list


function cloneList (list) {
	  return list.map(function (item) {
	return Object.assign({}, item)
  })
}
