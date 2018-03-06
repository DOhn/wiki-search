var prev_title;
var prev_desc;
var prev_link;

$("#search").autocomplete({
	source: function(query, result) { // query/term
		$.ajax({
			// Getting wiki API in JSONp form.
			url: "https://en.wikipedia.org/w/api.php",
			dataType: "jsonp",
			data: {
				'action': "opensearch",
				'format': "json",
				'search': query.term
			},
			success: function(data) {
				result(data[1]);
				
				$("#search-btn").click(function() {
					// iterate through the array and place all the possible functions into a post below the search bar.
					// Create new html for each one as it goes through all the 	possible results.
					if (prev_title !== undefined) {
						remove_prev_post();
					}
					prev_title = data[1];
					post_generator(data[1], data[2], data[3]);
				});	
			}
		});
	}
});

function post_generator(title, desc, link) {
	var i = 0;
	for (i = 0; i < title.length; i++) {
		$("<div class='container-fluid'><b><h1 class='topic'><a href="+link[i]+"> "+title[i]+" </a></h1></b><p class='info white-text'>"+desc[i]+"</p></div><br>").appendTo(".results");
	}
}

function remove_prev_post() {
	$(".results").empty();
}