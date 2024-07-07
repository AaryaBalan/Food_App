function getActivity() {
	if(JSON.parse(localStorage.getItem('DISH_ID')).length == 0){
		return `
			<div class="category-block filterCategory history-container">
				<div class="category-img1 history-block">
					<img src="../images/activity.svg">
				</div>
				<p class="category-info">
					<p class="go-to-btn" >Your Activity appears here..</p>
				</p>
			</div>
		`	
	}
	let dishList = JSON.parse(localStorage.getItem('DISH_NAMES'))
	let imgList = JSON.parse(localStorage.getItem('IMG_URL'))
	let idList = JSON.parse(localStorage.getItem('DISH_ID'))

	if(dishList.length > 10){
		dishList = dishList.slice(0,11)
		localStorage.setItem('DISH_NAMES', JSON.stringify(dishList))
	}
	if(imgList.length > 10){
		imgList = imgList.slice(0,11)
		localStorage.setItem('IMG_URL', JSON.stringify(imgList))
	}
	if(idList.length > 10){
		idList = idList.slice(0,11)
		localStorage.setItem('DISH_ID', JSON.stringify(idList))
	}


	let filterFoodHTML = ""
	for (var i = 0; i < idList.length; i++) {
		filterFoodHTML += `
			<div class="category-block filterCategory history-container">
				<div class="category-img1 history-block">
					<img src="${imgList[i]}">
				</div>
				<a href="single_food.html" class="category-info history-name-btn">
					<p class="go-to-btn" 
					data-url="${imgList[i]}"
					data-meal="${dishList[i]}" 
					data-id='${idList[i]}'
					onClick='getDish(this.dataset.id, this.dataset.url, this.dataset.meal)'>${dishList[i]}</p>
				</a>
			</div>
		`	
	}
	return filterFoodHTML
}

document.querySelector('.category-section-container').innerHTML = getActivity()

// console.log(dishList)
// console.log(imgList)

function clearDish(){
	localStorage.removeItem('searchDish')
}


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

function getLikeHTML() {
	const likedList = JSON.parse(localStorage.getItem('LIKED_DISH'))
	let likedHTML = ''
	if (likedList) {
		likedList.forEach(dish => {
			likedHTML += `
				<a href="single_food.html" onClick="localStorage.setItem('dish', ${dish['ID']})" class="liked-single-item">
					<li>${dish['DISH']}</li>
				</a>
			`
		})
	}
	else{
		likedHTML = `
			<li class="liked-single-item">Like Dish to appeare here</li>
		`
	}
	document.querySelector('.liked-items').innerHTML = likedHTML
}

getLikeHTML()