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
                        <div class="col-md-10 review_content">
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

requestTestimonies()

$("#loginForm").submit(function(event)
{
    event.preventDefault();
    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        url: "https://x-dtpl.ridhopratama.net/auth/login",
        data:JSON.stringify({
            username: $('#username').val(),
            password: $('#password').val()
        }),
        success: function(result)
        {
            if(result.data.user_data)
            {
                window.alert("berhasil login");
                window.location = 'index.html';
            }
            else
            {
                window.alert("Gagal Login");
            }
        }
    });
    return false;
});
