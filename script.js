const wrapper = document.querySelector('.wrapper'),
	sSpan = document.querySelector('#score'),
	lost = document.querySelector('.lost'),
	won = document.querySelector('.won')

const pairs = [
	'red',
	'green',
	'blue',
	'black',
	'yellow',
	'red',
	'green',
	'blue',
	'black',
	'yellow',
]

for (let i = 0; i < pairs.length; i++) {
	let replaced = pairs[i]
	pairs.splice(i, 1)
	let chosen = Math.floor(Math.random() * pairs.length)
	pairs.splice(chosen, 0, replaced)
}

for (let i = 0; i < pairs.length; i++) {
	const div = document.createElement('div')
	div.classList.add('pair', 'available')
	div.style.cssText =
		"background: url('./bg-2.jpg'); background-size: 100% 100%;"
	div.dataset.value = pairs[i]
	wrapper.append(div)
}

let prev, curr, prevClick
let score = 0
let int = 0
let left = 27

wrapper.addEventListener('click', e => {
	if (e.target.classList.contains('available')) {
		if (left == 1) {
			lost.classList.remove('hide')
			sSpan.textContent = 0
		} else {
			left--
			sSpan.textContent = left-1
			e.target.style.background = e.target.dataset.value
			e.target.style.pointerEvents = 'none'
			if (int == 0) {
				prevClick = e.target
				int++
				prev = e.target.dataset.value
			} else {
				int--
				curr = e.target.dataset.value
				if (prev == curr) {
					const useds = document.querySelectorAll(`div[data-value="${curr}"]`)
					useds.forEach(used => {
						used.classList.remove('available')
					})
					score++
					if (score == 5) {
						won.classList.remove('hide')
					}
				} else {
					setTimeout(() => {
						prevClick.style.cssText =
							"background: url('./bg-2.jpg'); background-size: 100% 100%;"
						e.target.style.cssText =
							"background: url('./bg-2.jpg'); background-size: 100% 100%;"
					}, 1000)
				}
			}
		}
	}
})

console.log('it got some errors to be fixed');
