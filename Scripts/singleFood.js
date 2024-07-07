const dish = localStorage.getItem('dish')

getFoodById(dish)

function openNav() {
	const sideNav = document.querySelector('.side-nav')
	sideNav.style.display = 'flex'
	sideNav.style.width = '250px'
	sideNav.style.paddingLeft = '20px'
}

function closeNav() {
	const sideNav = document.querySelector('.side-nav')
	sideNav.style.display = 'none'
	sideNav.style.width = 0
	sideNav.style.paddingLeft = 0
}

function like(thisElement, dish, id) {
	const likedDishes = localStorage.getItem('LIKED_DISH') || '[]'
	
	let hasPresent = false
	JSON.parse(likedDishes).forEach(food => {
		if(food['ID'] == id){
			hasPresent = true
			return
		}
	})
	if(!hasPresent){
		let a = JSON.parse(likedDishes)
		a.unshift({ID: id, DISH: dish})
		localStorage.setItem('LIKED_DISH', JSON.stringify(a))
	}
	
	console.log(dish)
	thisElement.style.color = '#ce3a60'
	document.querySelector('.fa-thumbs-down').style.color = 'black'
}

function dislike(thisElement, dish, id) {
	thisElement.style.color = '#ce3a60'
	document.querySelector('.fa-thumbs-up').style.color = 'black'
}
