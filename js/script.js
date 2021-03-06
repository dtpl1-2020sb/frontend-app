function sendTestimonies() {
    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        url: "https://x-dtpl.ridhopratama.net/vaccine/testimony",
        data: JSON.stringify({
            name: $('#fullName').val(),
            nickname: $('#nickName').val(),
            email: $('#email').val(),
            gender: $('input[name="gender"]:checked').val(),
            dob: $('#dateOfBirth').val(),
            nik: $('#nik').val(),
            address: $('#domicile').val(),
            text: $('#testimonies').val()
        }),
        success: function (result) {
            $('#submitTestimoniesModal').modal('hide');
            if (result.data.message == "create testimony success") {
                $('#modal-label').append("Berhasil");
                const message = "Testimoni Anda berhasil terkirim dan sedang dalam tahap review. Testimoni yang terpilih akan muncul di halaman ini."
                const p = `
                <p>${message}</p>
                `
                $('#modal-message').append(p);

                $('#afterSubmitTestimoniesModal').modal('show');
            }
            else {
                $('#modal-label').append("Gagal");
                const message = toTitleCase(result.data.message)
                const p = `
                <p>${message}</p>
                `
                $('#modal-message').append(p);

                $('#afterSubmitTestimoniesModal').modal('show');

            }
        }
    });
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}


function loginClickHandler() {
    let form_username = $("#username").val()
    let form_password = $("#password").val()
    
    if(form_username=='' || form_password==''){
        alert("Isian username dan password harus lengkap")
    }
    else{
        $.ajax({
            type: "POST",
            url: `https://x-dtpl.ridhopratama.net/auth/login`,
            data: JSON.stringify({username:form_username,password: form_password}),
            success: function (response) {
                localStorage['token_key'] = response.data.token;
                $('#form_login').modal('hide');
                setAfterAuth()
            },
            error: function(jqxhr){
                alert("Login Gagal: " + jqxhr.responseJSON.error.message);
            }
        })
    }

    return false
}


function logoutClickHandler() {
    localStorage['token_key'] = "";
    location.reload()
}


function testimonyLikeClickHandler(element, testimonyID) {
    $.ajax({
        type: "POST",
        url: `https://x-dtpl.ridhopratama.net/vaccine/testimony/${testimonyID}/like`,
        data: "",
        success: function (response) {
            location.reload();
            
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    })

    return false
}

function requestTestimonies(pages) {
    $("#review-card").empty();
    $('#pages').find('a').each(function(){
        var innerDivId = $(this).attr('id');
        $("#" + innerDivId).removeClass("active");
    });

    let pageNumber = 1
    if (pages != undefined){
        pageNumber = pages
    }
    $.ajax({
        type: "GET",
        url: "https://x-dtpl.ridhopratama.net/vaccine/testimonies?page=" + pageNumber,
        success: function (response) {
            $.each(response.data, function (i, x) {
                const card = `
                <div class="review_card" id="review_card_${x.id}">
                    <div class="row">
                        <div class="col-md-1 user_info">
                            <div id="profile_image">${x.author.name.charAt(0)}</div>
                        </div>
                        <div class="col-md-9 review_content">
                            <div class="clearfix add_bottom_15"></div>
                            <h5>${x.author.name}, ${x.author.age} Tahun, ${x.author.address}</h5>
                            <p>${x.text}</p>
                            <ul>
                                <li>
                                    <a href="#" id=like_button_t_${x.id} onclick="return testimonyLikeClickHandler(this, ${x.id})">
                                        <i class="icon_like_alt"></i>
                                        <span>Suka ${x.like_count}</span>
                                    </a>
                                </li>
                                <br>
                            </ul>
                        </div>
                    </div>
                </div>
                `

                $('#review-card').append(card);
                $("#page-" + pages).addClass("active");
            });
            
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    });
}

function checkNextPage() {
    var totalPage = 8;
    for (let page = 1; page < totalPage; page++) {
        $.ajax({
            type: "GET",
            async: false, 
            url: "https://x-dtpl.ridhopratama.net/vaccine/testimonies?page=" + page,
            success: function (response) {
                if(response.data.length > 0){
                    var pagination = `<a href="#" onclick="requestTestimonies(${page})" id="page-${page}" >${page}</a>`
                    $('#pages').append(pagination);
                } 
            },
            error: function(jqxhr){
                alert(jqxhr.responseText);
            }
        });
        
    }
}

function setAfterAuth(){
    if(localStorage['token_key']==null || localStorage['token_key'].length==0){
        $("#login").show();
        $("#admin_url").hide();
        $("#logout").hide();
    }
    else{
        $("#login").hide();
        $("#admin_url").show();
        $("#logout").show();
    }
}

function getFaq() {
    $.ajax({
        type: "GET",
        url: "https://x-dtpl.ridhopratama.net/site/configs?key=faq",
        success: function (response) {
            $.each(response.data[0].value, function (i, x) {
                const card = `
                <div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion_oneLeft"
									href="#faq${i}" aria-expanded="false" class="collapsed"> ${decodeURIComponent(x.question)} </a> </h4>
						</div>
						<div id="faq${i}" class="panel-collapse collapse" aria-expanded="false"
							role="tablist" style="height: 0px;">
							<div class="panel-body">
								<div class="text-accordion">
									<p> ${decodeURIComponent(x.answer)} </p>
								</div>
							</div>
						</div>
					</div>
                `

                $('#accordionFourLeft').append(card);
            });
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    });
}
getFaq()

function getAboutus() {
    $.ajax({
        type: "GET",
        url: "https://x-dtpl.ridhopratama.net/site/configs?key=about_us",
        success: function (response) {
            $.each(response.data, function (i, x) {
                const card = `
                <p>${x.value}</p>
                `

                $('#about-detail').append(card);
            });
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    });
}
getAboutus()

checkNextPage()
requestTestimonies()
setAfterAuth()
