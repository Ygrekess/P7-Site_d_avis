class App {

	launchApp(){
	    this.filterListener();
	}

	filterListener() {
		let filterButton = $("#filterId")[0];
		    filterButton.addEventListener('change', function () {
		    var selectedStars = filterButton.value;
		    this.filter(selectedStars);
		    }.bind(this));
	}

	filter(maxStars){
		let restaurantItem = $(".restaurantItem");

		for (var i = 0; i < restaurantItem.length; i++) {
			let restaurantRate = $(".restaurantRate")[i];
			let itemStars = restaurantRate.innerHTML;
			let x = Math.round(itemStars);
			let parentElm = restaurantRate.parentNode;

	        if (itemStars >= maxStars || maxStars === 'noFilter') {
	            // show item
	            parentElm.style.display = 'block';
	        } else {
	            // hidde item
	            parentElm.style.display = 'none';
	        }
		}
	}

	addMyRestaurant(map){
		let createMarkerButtonActive = false;
		let createMarkerButton = $("#createMarker")[0];
			createMarkerButton.addEventListener("click", activeMarker);

		function activeMarker() {
			alert("Double-cliquez à l'endroit où vous souhaitez ajouter votre restaurant.")
			createMarkerButtonActive = true;
			createMarkerButton.style.backgroundColor = "black";
			dblClick(createMarkerButtonActive);
		}

		function dblClick(createMarkerButtonActive){
			if (createMarkerButtonActive == true) {
				
				map.addListener('dblclick', function(e) {
					$('#modal_AddMarker').modal('toggle');		

				let modal_AddMarker_ButtonAddRestaurant = $("#modal_AddMarker_ButtonAddRestaurant")[0];
					modal_AddMarker_ButtonAddRestaurant.addEventListener("click", function(){
						let modal_AddMarker_RestaurantName = $("#modal_AddMarker_RestaurantName")[0];
						let modal_AddMarker_RestaurantAddress = $("#modal_AddMarker_RestaurantAddress")[0];
						let modal_AddMarker_RestaurantDescription = $("#modal_AddMarker_RestaurantDescription")[0];
						let description = {
								name : modal_AddMarker_RestaurantName.value,
								address : modal_AddMarker_RestaurantAddress.value,
								description : modal_AddMarker_RestaurantDescription.value
							};

						placeMarkerAndPanTo(
							createMarkerButtonActive, 
							e.latLng, 
							map, 
							description
						);
					});
				});
			} else {	
				google.maps.event.clearListeners(map, 'dblclick');
			}
		}

		function placeMarkerAndPanTo(createMarkerButtonActive, latLng, map, description) {
			var marker = new google.maps.Marker({
				position: latLng,
				map: map
			});
			map.panTo(latLng);

			var infoWindow = new google.maps.InfoWindow({
				content: description.name + " " + description.address + " " + description.description
			});
			marker.addListener('click', function() {
				infoWindow.open(map, marker);
			});
			createMarkerButtonActive = false;
			createMarkerButton.style.backgroundColor = "";
			dblClick(createMarkerButtonActive);
		}	
	}
}