function submitTestimonyClickHandler() {
    //baris dibawah menangkap nilai dari isian form
    let form_fullname = $("#fullName").val()
    let form_nickname = $("#nickName").val()
    let form_gender = $("input[name='gender']:checked").val()
    let form_dateOfBirth = $("#dateOfBirth").val()
    let form_nik = $("#nik").val()
    let form_domicile = $("#domicile").val()
    let form_w3review = $("#w3review").val()

    
    $.ajax({
        type: "POST",
        url: `https://x-dtpl.ridhopratama.net/vaccine/testimony`,
        data: JSON.stringify({
            name: form_fullname,
            dob: form_dateOfBirth,
            adress: form_domicile,
            text: form_w3review,
            gender: form_gender,
            nik: form_nik,
        }),
        success: function (response) {
            $('#form').modal('hide');
            alert("Data testimony berhasil disimpan")
        },
        error: function(jqxhr){
            alert("Proses penyimpanan data gagal: " + jqxhr.responseJSON.error.message);
        }
    })

    return false
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
            alert('Like testimony sukses!')
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    })

    return false
}

function requestTestimonies() {
    $.ajax({
        type: "GET",
        url: "https://x-dtpl.ridhopratama.net/vaccine/testimonies?page=1",
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
            });
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    });
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

requestTestimonies()
setAfterAuth()
