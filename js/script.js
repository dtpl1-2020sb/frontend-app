$.ajax({
	type: "GET",
    url: "http://ridhopratama.net:8899/vaccine/testimonies",
	success: function (data) {
        $.each(data.data, function (i, x) {
            $('#review-card').append('<div class="review_card""><div class="row"><div class="col-md-2 user_info"><figure><img src="img/avatar4.jpg" alt=""></figure><h5>'+ x.author.name  +'</h5></div><div class="col-md-10 review_content"><div class="clearfix add_bottom_15"></div><h4>'+ x.text +'</h4><p>'+ x.text +'</p><ul><li><a href="#0"><i class="icon_like_alt"></i><span>Suka</span></a></li><br></ul></div></div></div>');
        });
    },
	error: function(jqxhr){
		alert(jqxhr.responseText);
	}
});
