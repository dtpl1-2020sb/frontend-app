function testimonyChangeStatusClickHandler(element, testimonyID, status) {
    let label_status = ""
    switch(status) {
        case 1:
          label_status = "publish"
          break;
        case 2:
          label_status = "delete"
          break;
        case 3:
            label_status = "reject"
            break;
        default:
            label_status = "publish"      
    } 

    $.ajax({
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
            xhr.setRequestHeader('Authorization', "Bearer " + localStorage['token_key']);
        },
        url: `https://x-dtpl.ridhopratama.net/vaccine/testimony/${testimonyID}/change_status`,
        // dataType: "jsonp",
        // headers: {
        //     "Authorization": "Bearer " + localStorage['token_key'],
        //     "Content-Type": "text/plain"
        // },
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     "Access-Control-Allow-Methods": "POST",
        //     "Access-Control-Allow-Headers": "Authorization",
        //     "Access-Control-Max-Age" : "1000",
        //     "Authorization": "Bearer " + localStorage['token_key'],
        // },
        data: JSON.stringify({action:label_status}),
        success: function (response) {
            alert('Status testimony sukses dirubah menjadi:' + label_status)
            $('#belum-disetujui-card').empty();
            $('#sudah-disetujui-card').empty();
            requestTestimonies()
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    })

        // var settings = {
        //     "url": `http://ridhopratama.net:8899/vaccine/testimony/${testimonyID}/change_status`,
        //     "method": "POST",
        //     "timeout": 0,
        //     "crossDomain": true,
        //     "headers": {
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Credentials": "true",
        //         "Access-Control-Allow-Methods": "POST",
        //         "Access-Control-Allow-Headers": "Content-Type", 
        //         "Authorization": "Bearer " + localStorage['token_key'],
        //         "Content-Type": "application/json",
        //     },
        //     "data": JSON.stringify({action:label_status}),
        // };

        // $.ajax(settings).done(function (response) {
        //     alert('Status testimony sukses dirubah menjadi:' + label_status)
        //     $('#belum-disetujui-card').empty();
        //     $('#sudah-disetujui-card').empty();
        //     requestTestimonies()
        // });

    return false
}


function requestTestimonies() {
    //draft data
    $.ajax({
        type: "GET",
        url: "https://x-dtpl.ridhopratama.net/vaccine/testimonies?page=1&status=pending",
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
                                    <button class="btn btn-success" onclick="return testimonyChangeStatusClickHandler(this, ${x.id}, 1)">
                                        <i class="fa fa-check"></i> Terima
                                    </button>
                                </li>
                                <li>
                                    <button class="btn btn-danger" onclick="return testimonyChangeStatusClickHandler(this, ${x.id}, 3)">
                                        <i class="fa fa-times"></i> Tolak
                                    </button>
                                </li>
                                <br>
                            </ul>

                            
                        </div>
                    </div>
                </div>
                `

                $('#belum-disetujui-card').append(card);
            });
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    });

    //approve data
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
                        </div>
                        <div class="col-md-2 align-self-center">
                            <button class="btn btn-danger" onclick="return testimonyChangeStatusClickHandler(this, ${x.id}, 2)">
                                <i class="fa fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                </div>
                `

                $('#sudah-disetujui-card').append(card);
            });
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    });

    console.log(localStorage['token_key'])
}


function logoutClickHandler() {
    localStorage['token_key'] = "";
    location.reload()
}

function checkAuth(){
    if(localStorage['token_key']==null || localStorage['token_key'].length==0){
        window.location.replace("testimonies.html");
    }
}

requestTestimonies()
checkAuth()
