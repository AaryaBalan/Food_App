

searchDishByName()



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