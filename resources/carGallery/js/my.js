

let appSetColors = new Vue({
	el: "#constructor",
	data: {
		currentColor: null,
		currentNum: 3,
		currentWheel: null,
		colors: [],
		wheels: [],
		photo: '',
		background: ''
	},
	created: function() {
		this.getColors();
		this.getWheels();
		this.getMainPhoto();
	},
	methods: {
		getColors: function() {
			axios.post(
				'getColor.php'
				)
			.then (function (res) {
				appSetColors.colors = res.data;
			})
			.catch (function(error) {
				console.log(error);
			})
		},
		getWheels: function() {
			axios.post(
				'getWheel.php'
				)
			.then (function (res) {
				appSetColors.wheels = res.data;
			})
			.catch (function(error) {
				console.log(error);
			})
		},
		changePhoto: function(col, num, wh) {
			if (col != null) {
				appSetColors.currentColor = col;
			}

			if (num != null) {
				appSetColors.currentNum = num;
			} 

			if (wh != null) {
				appSetColors.currentWheel = wh;
			}

			if (appSetColors.currentNum == 36) {
				appSetColors.currentNum = 0;
			} else if (appSetColors.currentNum == -1) {
				appSetColors.currentNum = 35;
			}

			appSetColors.getMainPhoto(appSetColors.currentColor, appSetColors.currentNum, appSetColors.currentWheel);
		},
		getMainPhoto: function (col, currentNum, wheelsType) {
			axios({
				method: 'POST',
				url: 'getPhoto.php',
				params: {
					color: col,
					currentNum: currentNum,
					wheelsType: wheelsType
				}
			})
			.then(function(res) {
				appSetColors.photo = res.data;
				appSetColors.background = "url('" + res.data + "')";
			})
			.catch(function(error) {
				console.log(error);
			})
		}
	}

});

