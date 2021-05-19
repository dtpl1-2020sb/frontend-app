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

function checkNextPageNotApproved() {
    var totalPage = 8;
    for (let page = 2; page < totalPage; page++) {
        $.ajax({
            type: "GET",
            async: false, 
            url: "https://x-dtpl.ridhopratama.net/vaccine/testimonies?page=" + page + "&status=pending",
            success: function (response) {
                if(response.data.length > 0){
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
                }
            },
            error: function(jqxhr){
                alert(jqxhr.responseText);
            }
        });
        
    }
}

function checkNextPageApproved() {
    var totalPage = 8;
    for (let page = 2; page < totalPage; page++) {
        $.ajax({
            type: "GET",
            url: "https://x-dtpl.ridhopratama.net/vaccine/testimonies?page=" + page,
            success: function (response) {
                if(response.data.length > 0){
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
                }
            },
            error: function(jqxhr){
                alert(jqxhr.responseText);
            }
        });
        
    }
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
            checkNextPageNotApproved()
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
            checkNextPageApproved()
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
        window.location.replace("index.html");
    }
}

requestTestimonies()
checkAuth()

function getAdminFaq() {
    $.ajax({
        type: "GET",
        async: false, 
        url: "https://x-dtpl.ridhopratama.net/site/configs?key=faq",
        success: function (response) {
            $.each(response.data[0].value, function (i, x) {
                const card = `
                <label for="value[${i}][question]">Question ${i + 1}</label>
				<input type="text" id="value[${i}][question]" name="value[${i}][question]" value="${decodeURIComponent(x.question)}">
			  
				<label for="value[${i}][answer]">Answer ${i + 1}</label>
                <textarea id="value[${i}][answer]" name="value[${i}][answer]" class="form-control" rows="5">${decodeURIComponent(x.answer)}</textarea>
                `
                
                $('#formFaq').append(card);
                if ((response.data[0].value.length - 1) == i) {
                    const number = `<input type="hidden" value="${i}" id="total_chq">`
                    $('#formFaq').append(number);
                }

            });
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    });
}

getAdminFaq()

function updateFaq() {
    let qna ="";
    for (let index = 0; index <= parseInt($('#total_chq').val()); index++) {
        qna += `{"question": "` + encodeURIComponent(document.getElementById(`value[${index}][question]`).value) +`","answer": "`+ encodeURIComponent(document.getElementById(`value[${index}][answer]`).value) +`"}`
        if ((parseInt($('#total_chq').val())) != index) {
            qna +=`,`
        }
    }

    let data = `{"key": "faq","value":[`+qna+`]}`

    $.ajax({
        type: "POST",
        async: false, 
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
            xhr.setRequestHeader('Authorization', "Bearer " + localStorage['token_key']);
        },
        url: `https://x-dtpl.ridhopratama.net/site/config`,
        data: JSON.stringify(JSON.parse(data)),
        success: function (response) {
            alert('FAQ Updated')
            location.reload()
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    })

    return false
}

$('#add').on('click', add);
$('#remove').on('click', remove);

function add() {
  var new_chq_no = parseInt($('#total_chq').val()) + 1;
//   var new_input = "<label for='value[" + new_chq_no + "][question]' id='value[" + new_chq_no + "][question]'>Added Question</label> <input type='text' id='value[" + new_chq_no + "][question]' name='value[" + new_chq_no + "][question]'><br><label for='value[" + new_chq_no + "][answer]' id='value[" + new_chq_no + "][answer]'>Added Answer</label><input type='text' name='value[" + new_chq_no + "][answer]' id='value[" + new_chq_no + "][answer]'>";
  var new_input = "<label for='value[" + new_chq_no + "][question]' class='new_label_" + new_chq_no + "'>Added Question</label> <input type='text' class='new_" + new_chq_no + "' id='value[" + new_chq_no + "][question]' name='value[" + new_chq_no + "][question]'><br><label for='value[" + new_chq_no + "][answer]' class='new_label_" + new_chq_no + "'>Added Answer</label><input type='text' class='new_" + new_chq_no + "' id='value[" + new_chq_no + "][answer]' name='value[" + new_chq_no + "][answer]'>";

  $('#new_chq').append(new_input);

  $('#total_chq').val(new_chq_no);
}

function remove() {
  var last_chq_no = $('#total_chq').val();

  if (last_chq_no > 0) {
    // $('#value[' + last_chq_no + '][question]').remove();
    // $('#value[' + last_chq_no + '][answer]').remove();
    $('.new_label_' + (last_chq_no)).remove();
    $('.new_label_' + (last_chq_no)).remove();
    $('.new_' + last_chq_no).remove();
    $('.new_' + (last_chq_no)).remove();
    $('#total_chq').val(last_chq_no - 1);
  }
}

function getAdminAboutus() {
    $.ajax({
        type: "GET",
        async: false, 
        url: "https://x-dtpl.ridhopratama.net/site/configs?key=about_us",
        success: function (response) {
            $.each(response.data, function (i, x) {
                const card = `
                <textarea id="value[${i}][detail]" name="value[${i}][detail]" class="form-control" rows="5">${decodeURIComponent(x.value)}</textarea>
                `
                
                $('#formAboutus').append(card);
                if ((response.data[0].value.length - 1) == i) {
                    const number = `<input type="hidden" value="${i}" id="total_chq">`
                    $('#formAboutus').append(number);
                }

            });
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    });
}


function updateAboutus() {
    let qna ="";
    for (let index = 0; index <= parseInt($('#total_chq').val()); index++) {
        qna += `{"value": "` + encodeURIComponent(document.getElementById(`value[${index}][question]`).value) +`"}`
        if ((parseInt($('#total_chq').val())) != index) {
            qna +=`,`
        }
    }

    let data = `{"key": "about_us","value":[`+qna+`]}`

    $.ajax({
        type: "POST",
        async: false, 
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
            xhr.setRequestHeader('Authorization', "Bearer " + localStorage['token_key']);
        },
        url: `https://x-dtpl.ridhopratama.net/site/config`,
        data: JSON.stringify(JSON.parse(data)),
        success: function (response) {
            alert('About Us Updated')
            location.reload()
        },
        error: function(jqxhr){
            alert(jqxhr.responseText);
        }
    })

    return false
}
