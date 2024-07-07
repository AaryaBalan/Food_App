function getFoodById(id) {
   console.log(id);
   const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

   fetch(URL)
      .then((response) => {
         return response.json();
      })
      .then((dish) => {
         let ingredients = "";
         let dishHTML = "";
         let footHTML = "";
         dish.meals.forEach((food) => {
            for (i = 1; i <= 20; i++) {
               if (food["strIngredient" + i] == "") {
                  break;
               }
               ingredients += `${i}. &nbsp; &nbsp;${
                  food["strIngredient" + i]
               }<br>`;
            }
            dishHTML += `
				<div class='left-section-food'>
					<div class="category-block">
						<div class="category-img">
							<img src="${food.strMealThumb}">
						</div>
						<div class="category-info">
							<p class="go-to-btn" 
							data-category="${food.strCategory}" 
							data-foodId='${food.idMeal}'>
								${food.strMeal}</p>
						</div>
						
					</div>
					<div class="ingredients">
						<div class="ingredients-head">Ingredients</div>
						<div class='ingredients-list'>
							${ingredients}
						</div>
					</div>
				</div>
				<div class="instructions-container">
					<div class="instructions-head">
						Instructions
					</div>
					<div class="instructions">
						${food.strInstructions.replace(/\n/gi, "<hr>")}
					</div>
					<div class="yt-video">
						<a href="${food.strYoutube}">
							${
                        food.strYoutube !== ""
                           ? '<i class="fa-brands fa-youtube" style="color: #ce3a60;"></i>Watch this recipe on youtube'
                           : '<i class="fa-brands fa-youtube" style="color: #ce3a60;"></i>Oops! sorry there is no video for this recipe'
                     }
						</a>
					</div>
					<div class="like-container">
						<div class="like">
							<i onClick='like(this, "${food.strMeal}", "${
               food.idMeal
            }")' class="fa-solid fa-thumbs-up fa-flip-horizontal"></i>
							Like
						</div>
						<div class="dislike">
							<i onClick='dislike(this, "${food.strMeal}", "${
               food.idMeal
            }")' class="fa-solid fa-thumbs-down fa-flip-horizontal"></i>
							Dislike
						</div>
					</div>
				</div>
			`;

            footHTML += `
				
				<div class="tags-foot">Tags:
					${
                  food.strTags
                     ? '<span class="foot-ans">' + food.strTags + "</span>"
                     : '<span class="foot-ans">None</span>'
               } 
				</div>
				<div class="area-foot">Location: <span class="foot-ans">${
               food.strArea
            }</span></div>

			`;

            document.querySelector(
               ".category-head"
            ).innerHTML = `${food.strMeal}<br>Category: ${food.strCategory}`;
         });
         return [dishHTML, footHTML];
      })
      .then((html) => {
         document.querySelector(".category-section-container").innerHTML =
            html[0];
         document.querySelector(".footer").innerHTML = html[1];
         // localStorage.setItem('recentDish', JSON.stringify(recentList))
      });
}

function searchDishByName() {
   const dishName = localStorage.getItem("searchDish");
   const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`;

   fetch(URL)
      .then((response) => {
         return response.json();
      })
      .then((dishes) => {
         console.log(dishes);

         if (!dishName) {
            return `
				<div class="category-block center-block">
					<div class="category-img">
						<img src="../images/search_something.svg">
					</div>
					<p class="category-info">
						<p class="go-to-btn"'>
							Try Searching Something...
						</p>
					</p>
				</div>
			`;
         }

         if (!dishes.meals) {
            return `
				<div class="category-block">
					<div class="category-img center-block">
						<img src="../images/not_found.svg">
					</div>
					<p class="category-info">
						<p class="go-to-btn">
							No Dish Found
						</p>
					</p>
				</div>
			`;
         }
         let dishHTML = "";
         dishes.meals.forEach((dish) => {
            dishHTML += `
				<div class="category-block">
					<div class="category-img">
						<img src="${dish.strMealThumb}">
					</div>
					<a href="single_food.html" class="category-info">
						<p class="go-to-btn" 
						data-url="${dish.strMealThumb}"
						data-meal="${dish.strMeal}" 
						data-id='${dish.idMeal}'
						onClick='getDish(this.dataset.id, this.dataset.url, this.dataset.meal)'>${dish.strMeal}</p>
					</a>
				</div>
			`;
         });
         return dishHTML;
      })
      .then((HTML) => {
         document.querySelector(".category-section-container").innerHTML = HTML;
      });
}

let thisArea;

function getFoodArea() {
   const URL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
   fetch(URL)
      .then((response) => {
         return response.json();
      })
      .then((areaFoods) => {
         let areaFoodsHTML = "";
         areaFoods.meals.forEach((areaFood) => {
            areaFoodsHTML += `
			<div class="area-block">
				<div class="area-img">
					<img src="../images/places.svg">
				</div>
				<a href="#top" class="area-info" 
				data-area="${areaFood.strArea}" 
				onClick="getParticularArea(this.dataset.area)">${areaFood.strArea}</a>
			</div>
			`;
         });
         document.querySelector(".area-section-container").innerHTML =
            areaFoodsHTML;
      });
}

function getParticularArea(area) {
   document.querySelector(".top-nav").style.opacity = 0.5;
   document.querySelector(".area-section-container-head").style.opacity = 0.5;
   document.querySelector(".info-box-container").style.opacity = 1;
   document.querySelector(".info-box-container").style.zIndex = 2000;

   const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;

   fetch(URL)
      .then((response) => {
         return response.json();
      })
      .then((areaFoods) => {
         let filterAreaFoodsHTML = "";
         areaFoods.meals.forEach((areaFood) => {
            filterAreaFoodsHTML += `
				<div class="area-block filterArea">
					<div class="area-img1">
						<img src="${areaFood.strMealThumb}">
					</div>
					<a href="single_food.html"
					class="area-info" 
					data-url="${areaFood.strMealThumb}"
					data-meal="${areaFood.strMeal}" 
					data-id='${areaFood.idMeal}'
					onClick='getDish(this.dataset.id, this.dataset.url, this.dataset.meal)'>
						<p class="go-to-btn" 
						>${areaFood.strMeal}</p>
					</a>
				</div>
			`;
         });
         return filterAreaFoodsHTML;
      })
      .then((html) => {
         document.querySelector(".area-title").innerHTML = area;
         document.querySelector(".message-container").innerHTML = html;
      });
}

function getFoodCategory() {
   const URL = "https://www.themealdb.com/api/json/v1/1/categories.php";

   fetch(URL)
      .then((response) => {
         return response.json();
      })
      .then((foodCategory) => {
         let foodCategoryHtml = "";
         foodCategory.categories.forEach((food) => {
            console.log(food);
            foodCategoryHtml += `
				<div class="category-block">
					<div class="category-img">
						<img src="${food.strCategoryThumb}">
					</div>
					<div class="category-info">
						<p class="go-to-btn" 
						data-category="${food.strCategory}" 
						data-foodId='${food.idMeal}'
						onClick='getFoodCategoryFilter(this.dataset.category)'>${food.strCategory}</p>
					</div>
				</div>
			`;
         });
         document.querySelector(".category-section-container").innerHTML =
            foodCategoryHtml;
      });
}

function getFoodCategoryFilter(category) {
   document.querySelector(".top-nav").style.opacity = 0.5;
   document.querySelector(
      ".category-section-container-head"
   ).style.opacity = 0.5;
   document.querySelector(".info-box-container").style.opacity = 1;
   document.querySelector(".info-box-container").style.zIndex = 2000;

   const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

   fetch(URL)
      .then((response) => {
         return response.json();
      })
      .then((filterFoods) => {
         console.log(filterFoods);
         let filterFoodHTML = "";
         filterFoods.meals.forEach((filterFood) => {
            filterFoodHTML += `
				<div class="category-block filterCategory">
					<div class="category-img1">
						<img src="${filterFood.strMealThumb}">
					</div>
					<a href="single_food.html" class="category-info">
						<p class="go-to-btn" 
						data-url="${filterFood.strMealThumb}"
						data-meal="${filterFood.strMeal}" 
						data-id='${filterFood.idMeal}'
						onClick='getDish(this.dataset.id, this.dataset.url, this.dataset.meal)'>${filterFood.strMeal}</p>
					</a>
				</div>
			`;
         });
         return filterFoodHTML;
      })
      .then((filterFoodHTML) => {
         document.querySelector(".category-title").innerHTML = category;
         document.querySelector(".message-container").innerHTML =
            filterFoodHTML;
      });
}

function getDish(id, url, name) {
   let idData = localStorage.getItem("DISH_ID") || "[]";
   localStorage.setItem("dish", id);

   if (!JSON.parse(idData).includes(id)) {
      let a = JSON.parse(idData);
      a.unshift(id);
      localStorage.setItem("DISH_ID", JSON.stringify(a));
   }

   let data = localStorage.getItem("DISH_NAMES") || "[]";

   if (!JSON.parse(data).includes(name)) {
      let b = JSON.parse(data);
      b.unshift(name);
      localStorage.setItem("DISH_NAMES", JSON.stringify(b));
   }

   let imgUrl = localStorage.getItem("IMG_URL") || "[]";

   if (!JSON.parse(imgUrl).includes(url)) {
      let c = JSON.parse(imgUrl);
      c.unshift(url);
      localStorage.setItem("IMG_URL", JSON.stringify(c));
   }
}

function getInput() {
   const dishName = document.querySelector(".search-bar").value;
   localStorage.setItem("searchDish", dishName);
}

function clearDish() {
   localStorage.removeItem("searchDish");
}
