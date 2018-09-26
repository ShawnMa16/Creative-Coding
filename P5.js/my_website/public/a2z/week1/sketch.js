var text
var button
var output

function setup() {
	noCanvas()

	// createDiv(text)

	// var joinedText = join(text, ' ')
	// joinedText = joinedText.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")

	// let words = split(joinedText, ' ')

	// console.log(words)

	// var output = shuffle(words)
	// output = join(output, ' ')

	// createP(output)

	button = document.getElementById("cut")
	output = document.getElementById("output")

	button.onclick = function () {
		let text = document.getElementById("sentence").value

		console.log(text)

		let replace = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")

		let words = split(replace, ' ')

		let final = shuffle(words).join(' ')

		output.innerHTML = final
		console.log(final)
	}
}

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		// And swap it with the current element.
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}

	return array
}

