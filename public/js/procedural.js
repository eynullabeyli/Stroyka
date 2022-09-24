/* Category section */
const api_base_url =  "http://142.93.240.128:3000/api";
/* to get all up category list */
function GetUpCategories() {
    let tmp__;
    $.ajax({
        type: "GET",
        url: `${api_base_url}/stroyka/get/categories`,
        success: function (data, textStatus, xhr) {
            $(`.SelectedUpCategory, select[name="up_cat_for_product"]`).html('');
            $(`.SelectedUpCategory, select[name="up_cat_for_product"]`).append('<option selected value="0">Seçimi edin</option>')
            $(data).each(function(k,v) {
                $(`.SelectedUpCategory, select[name="up_cat_for_product"]`)
                .append(`<option data-slug="${v.slug}" value="${v.uniq_id}">AZ: ${v.name_az} | EN:  ${v.name_en} | RU:  ${v.name_ru}</option>`);
            })
        }
    })
    return tmp__;
}
GetUpCategories(); /* fpl */

$(`#NewAltCategoryForm select[name="alt_up_category_selected"]`).on("change", function(e) {
    let tmp_id__ = $(this).find(":selected").data("slug");
    $.ajax({
        type: "GET",
        url: `${api_base_url}/stroyka/get/getSubCatsByCatSlug/${tmp_id__}`,
        success: function (data, textStatus, xhr) {
            $(`select[name="alt_sub_category_selected"]`).html('');
            $(`select[name="alt_sub_category_selected"]`).append('<option selected value="0">Seçimi edin</option>')
            $(data).each(function(k,v) {
                $(`select[name="alt_sub_category_selected"]`)
                .append(`<option value="${v.uniq_id}">AZ: ${v.name_az} | EN:  ${v.name_en} | RU:  ${v.name_ru}</option>`);
            });
        }
    })
})


/* USERS LIST DATA FOR GRID */
if(window.location.pathname === "/dashboard/users") {
    var usersTable = new gridjs.Grid({
        columns: ["Tam adı", "Əlaqə nömrəsi", "E-poçt", "Ünvan"],
        server: {
            url: `${api_base_url}/stroyka/users/list`,
            then: data => data.map(card => 
                [
                    `${card.name} ${card.lastname}`,
                    card.phone,
                    card.email,
                    card.adress,
                ])
        },
        pagination: { limit: 7 }
    }).render(document.getElementById("usersTable"));
}
/* CATEGORY LIST DATA FOR GRID */
var categoryTable;
var subcategoryTable;
var altcategoryTable;
if(window.location.pathname === "/dashboard/category") {
    categoryTable = new gridjs.Grid({
        columns: ["Adı AZ", "Adı EN", "Adı RU", "Slug", "---"],
        pagination: {
            enabled: true,
            limit: 3,
            summary: false
        },
        server: {
            url: `${api_base_url}/stroyka/get/categories`,
            then: data => data.map(card => 
                [
                    card.name_az,
                    card.name_en,
                    card.name_ru,
                    card.slug,
                    gridjs.html(`
                    <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-danger DeleteCategoryBTN">Sil</button>
                    <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-warning EditCatBTN" data-action="edit"><i class="fa fa-pencil"></i></button>`)
                ])
          }
    }).render(document.getElementById("categoryTable"));

    subcategoryTable = new gridjs.Grid({
        columns: ["Adı AZ", "Adı EN", "Adı RU", "Slug", "---"],
        pagination: {
            enabled: true,
            limit: 3,
            summary: false
        },
        server: {
            url: `${api_base_url}/stroyka/get/subcategories`,
            then: data => data.map(card => 
                [
                    card.name_az,
                    card.name_en,
                    card.name_ru,
                    card.slug,
                    gridjs.html(`
                    <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-danger DeleteSubCategoryBTN">Sil</button>
                    <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-warning EditCatBTN" data-action="edit"><i class="fa fa-pencil"></i></button>`)
                ])
          }
    }).render(document.getElementById("subcategoryTable"));

    altcategoryTable = new gridjs.Grid({
        columns: ["Adı AZ", "Adı EN", "Adı RU", "Slug", "---"],
        pagination: {
            enabled: true,
            limit: 3,
            summary: false
        },
        server: {
            url: `${api_base_url}/stroyka/get/altcategories`,
            then: data => data.map(card => 
                [
                    card.name_az,
                    card.name_en,
                    card.name_ru,
                    card.slug,
                    gridjs.html(`
                    <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-danger DeleteAltCategoryBTN">Sil</button>
                    <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-warning EditCatBTN" data-action="edit"><i class="fa fa-pencil"></i></button>`)
                ])
          }
    }).render(document.getElementById("altcategoryTable"));

    $(document).on("click", ".EditCatBTN", function() {
        $(`#cat_az_name_input`).val('');
        $(`#cat_en_name_input`).val('');
        $(`#cat_ru_name_input`).val('');
        $("#CatInfoModal").modal("show")
    });
}

$(document).on("click", ".DeleteCategoryBTN", function(e) {
    let tmp_id__ = $(this).data("id");
    $.ajax({
        type: "DELETE",
        url: `${api_base_url}/admin/delete/category`,
        data: {
            uniq_id: tmp_id__
        },
        success: function(data) {
            alert("Kateqoriya silindi");
            categoryTable.forceRender(document.getElementById("categoryTable"));
        }
    })
});
$(document).on("click", ".DeleteSubCategoryBTN", function(e) {
    let tmp_id__ = $(this).data("id");
    $.ajax({
        type: "DELETE",
        url: `${api_base_url}/admin/delete/subcategory`,
        data: {
            uniq_id: tmp_id__
        },
        success: function(data) {
            alert("Sub kateqoriya silindi");
            subcategoryTable.forceRender(document.getElementById("subcategoryTable"));
        }
    })
});
$(document).on("click", ".DeleteAltCategoryBTN", function(e) {
    let tmp_id__ = $(this).data("id");
    $.ajax({
        type: "DELETE",
        url: `${api_base_url}/admin/delete/altcategory`,
        data: {
            uniq_id: tmp_id__
        },
        success: function(data) {
            alert("Alt kateqoriya silindi");
            altcategoryTable.forceRender(document.getElementById("altcategoryTable"));
        }
    })
});

/* create new category */
$("#NewUpCategoryForm").submit( (e) => {
    e.preventDefault();
    let tmp__ = JSON.stringify([{
        az: $(`#NewUpCategoryForm input[name="up_cat_name_az_input"]`).val(),
        en: $(`#NewUpCategoryForm input[name="up_cat_name_en_input"]`).val(),
        ru: $(`#NewUpCategoryForm input[name="up_cat_name_ru_input"]`).val()
    }]);
    $.ajax({
        type: "POST",
        url: `${api_base_url}/admin/createNewCategory`,
        data: {
            name_az: $(`#NewUpCategoryForm input[name="up_cat_name_az_input"]`).val(),
            name_en: $(`#NewUpCategoryForm input[name="up_cat_name_en_input"]`).val(),
            name_ru: $(`#NewUpCategoryForm input[name="up_cat_name_ru_input"]`).val(),
            slug: $(`#NewUpCategoryForm input[name="up_cat_name_az_input"]`).val().toLowerCase()
        },
        success: function(data, textStatus, xhr) {
            if(xhr.status === 201) {
                Swal.fire(
                    'Məlumat',
                    'Üst kateqoriya uğurla yaradıldı',
                    'success'
                )
                GetUpCategories();
                categoryTable.forceRender(document.getElementById("categoryTable"));
            }
            else {
                console.log(data, textStatus, xhr);
                alert("Xəta baş verdi...")
            }
        }
    })
});

/* create new sub category */
$("#NewSubCategoryForm").submit( (e) => {
    e.preventDefault();
    if($(".SelectedUpCategory").val() !== "0") {
        $.ajax({
            type: "POST",
            url: `${api_base_url}/admin/createNewSubCat`,
            data: {
                name_az: $(`#NewSubCategoryForm input[name="sub_cat_name_input"]`).val(),
                name_en: $(`#NewSubCategoryForm input[name="sub_cat_name_en_input"]`).val(),
                name_ru: $(`#NewSubCategoryForm input[name="sub_cat_name_ru_input"]`).val(),
                slug: $(`#NewSubCategoryForm input[name="sub_cat_name_input"]`).val().toLowerCase(),
                category_id: $(".SelectedUpCategory").val()
            },
            success: function(data, textStatus, xhr) {
                if(xhr.status === 201) {
                    Swal.fire(
                        'Məlumat',
                        'Sub kateqoriya uğurla yaradıldı',
                        'success'
                    )
                    subcategoryTable.forceRender(document.getElementById("categoryTable"));
                }
                else {
                    console.log(data, textStatus, xhr);
                    alert("Xəta baş verdi...")
                }
            }
        })
    }
});

/* create new alt category */
$("#NewAltCategoryForm").submit( (e) => {
    e.preventDefault();
    if($(".SelectedUpCategory").val() !== "0" || $(".SelectedSubCategory").val() !== "0") {
        $.ajax({
            type: "POST",
            url: `${api_base_url}/admin/createNewAltCat`,
            data: {
                name_az: $(`#NewAltCategoryForm input[name="alt_cat_name_input"]`).val(),
                name_en: $(`#NewAltCategoryForm input[name="alt_cat_name_en_input"]`).val(),
                name_ru: $(`#NewAltCategoryForm input[name="alt_cat_name_ru_input"]`).val(),
                slug: $(`#NewAltCategoryForm input[name="alt_cat_name_input"]`).val().toLowerCase(),
                category_id: $(`select[name="alt_up_category_selected"]`).val(),
                subCategory_id: $(`select[name="alt_sub_category_selected"]`).val()
            },
            success: function(data, textStatus, xhr) {
                if(xhr.status === 201) {
                    Swal.fire(
                        'Məlumat',
                        'Alt kateqoriya uğurla yaradıldı',
                        'success'
                    )
                    altcategoryTable.forceRender(document.getElementById("altcategoryTable"));
                }
                else {
                    console.log(data, textStatus, xhr);
                    alert("Xəta baş verdi...")
                }
            }
        })
    }
});

$(document).on( 'change', `select[name="alt_up_category_selected"]`, function() {
    console.log("changed");
    $(`select[name="alt_sub_category_selected"]`).val()
});

/* SLIDER SECTION */
var sliderListTable;
if(window.location.pathname === "/dashboard/slider") {
    $("#NewSliderForm").submit(function(e) {
        e.preventDefault();
        var tmp_title__ = {
            az: $("#SliderTitleAZInput").val(),
            en: $("#SliderTitleENInput").val(),
            ru: $("#SliderTitleRUInput").val()
        };
        var tmp_description__ = {
            az: $("#DescriptionAZInput").val(),
            en: $("#DescriptionENInput").val(),
            ru: $("#DescriptionRUInput").val()
        };
        $(`#NewSliderForm input[name="title"]`).val(JSON.stringify(tmp_title__));
        $(`#NewSliderForm input[name="description"]`).val(JSON.stringify(tmp_description__));
        var fd = new FormData(document.getElementById("NewSliderForm"));
        setTimeout(function() {
            $.ajax({
                type: "POST",
                url: `${api_base_url}/admin/createNewSlider`,
                data: fd,
                processData: false,
                contentType: false,
                success: function(data, textStatus, xhr) {
                    if(xhr.status === 201) {
                        Swal.fire(
                            'Məlumat',
                            'Slider uğurla yaradıldı',
                            'success'
                        )
                        sliderListTable.forceRender(document.getElementById("sliderListTable"));
                    }
                    else {
                        console.log(data, textStatus, xhr);
                        alert("Xəta baş verdi...")
                    }
                }
            })
        }, 1000)
    });

    sliderListTable = new gridjs.Grid({
        columns: ["Başlıq AZ", "Başlıq EN", "Başlıq RU", "---"],
        server: {
            url: `${api_base_url}/stroyka/get/slider`,
            then: data => data.map(card => 
                [
                    `${JSON.parse(card.title).az}`,
                    `${JSON.parse(card.title).en}`,
                    `${JSON.parse(card.title).ru}`,
                    gridjs.html(`
                    <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-danger DeleteSliderBTN"><i class="fa fa-trash"></i> Sil</button>
                    <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-warning EditSliderBTN" data-action="edit"><i class="fa fa-pencil"></i></button>`)
                ])
          }
    }).render(document.getElementById("sliderListTable"));

    $(document).on("click", ".DeleteSliderBTN", function(e) {
        let tmp_id__ = $(this).data("id"); //dont touch it
        $.ajax({
            type: "DELETE",
            url: `${api_base_url}/admin/delete/slider`,
            data: {
                uniq_id: tmp_id__
            },
            success: function(data) {
                alert("Slider silindi");
                sliderListTable.forceRender(document.getElementById("sliderListTable"));
            }
        })
    });

    $(document).on("click", ".EditSliderBTN", function() {
        $("#SliderrModal").modal("show");
    })
}

/* BANNER SECTION */
var bannerListTable;
if(window.location.pathname === "/dashboard/banner") {
    $("#NewBanerForm").submit(function(e) {
        e.preventDefault();
        let tmp_title__ = {
            az: $("#baner_name_input").val(),
            en: $("#baner_name_en_input").val(),
            ru: $("#baner_name_ru_input").val()
        };
        let tmp_description__ = {
            az: $("#BannerDescriptionAZ").val(),
            en: $("#BannerDescriptionEN").val(),
            ru: $("#BannerDescriptionRU").val()
        }
        $(`input[name="title"]`).val(JSON.stringify(tmp_title__));
        $(`input[name="description"]`).val(JSON.stringify(tmp_description__));
        var fd = new FormData(document.getElementById("NewBanerForm"));
        $.ajax({
            type: "POST",
            url: `${api_base_url}/admin/createNewBanner`,
            data: fd,
            processData: false,
            contentType: false,
            success: function(data, textStatus, xhr) {
                if(xhr.status === 200) {
                    Swal.fire(
                        'Məlumat',
                        'Banner uğurla yaradıldı',
                        'success'
                    )
                    bannerListTable.forceRender(document.getElementById("bannerListTable"));
                }
                else {
                    console.log(data, textStatus, xhr);
                    alert("Xəta baş verdi...")
                }
            }
        })
    });

    bannerListTable = new gridjs.Grid({
        columns: ["Başlıq AZ", "Başlıq EN", "Başlıq RU", "---"],
        server: {
            url: `${api_base_url}/stroyka/banners/list`,
            then: data => data.map(card => 
                [
                    `${JSON.parse(card.title).az}`,
                    `${JSON.parse(card.title).en}`,
                    `${JSON.parse(card.title).ru}`,
                    gridjs.html(`
                    <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-danger DeleteBannerBTN"><i class="fa fa-trash"></i> Sil</button>
                    <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-warning EditBannerBTN" data-action="edit"><i class="fa fa-pencil"></i></button>`)
                ])
          }
    }).render(document.getElementById("bannerListTable"));

    $(document).on("click", ".DeleteBannerBTN", function() {
        let tmp_id__ = $(this).data("id");
        $.ajax({
            type: "DELETE",
            url: `${api_base_url}/admin/delete/banner`,
            data: {
                uniq_id: tmp_id__
            },
            success: function(data) {
                alert("Banner silindi");
                bannerListTable.forceRender(document.getElementById("bannerListTable"));
            }
        })
    });

    $(document).on("click", ".EditBannerBTN", function() {
        $("#BannerModal").modal("show")
    })
}

if(window.location.pathname === "/dashboard/about") {
    /* GET INPUT DATA FOR ABOUT PAGE  */
    $.ajax({
        url: `${api_base_url}/stroyka/get/about`,
        type: "GET",
        success: function(data) {
            $(`input[name="uniq_id"]`).val(data.results[0][0].uniq_id)
            $(`input[name="about_az_input"]`).val(data.results[0][0].title.az)
            $(`input[name="about_en_input"]`).val(data.results[0][0].title.en)
            $(`input[name="about_ru_input"]`).val(data.results[0][0].title.ru)
            $(`#contentAZAbout`).val(data.results[0][0].context.az)
            $(`#contentENAbout`).val(data.results[0][0].context.en)
            $(`#contentRUAbout`).val(data.results[0][0].context.ru)
        }
    })
    /* UPDATE EXISTING ABOUT PAGE TEXT */
    $("#AboutUs").submit(function(e) {
        e.preventDefault();
        $('button[type="submit"] svg').addClass("fa-spin");
        let tmp_obj__ = {
            uniq_id: $(`input[name="uniq_id"]`).val(),
            title: {
                az: $(`input[name="about_az_input"]`).val(),
                en: $(`input[name="about_en_input"]`).val(),
                ru: $(`input[name="about_ru_input"]`).val(),
            },
            context: {
                az: $(`#contentAZAbout`).val(),
                en: $(`#contentENAbout`).val(),
                ru: $(`#contentRUAbout`).val(),
            }
        };
        $.ajax({
            url: `${api_base_url}/admin/update/aboutus`,
            type: "PUT",
            data: tmp_obj__,
            success: function(data, textStatus, xhr) {
                if(xhr.status === 200) {
                    $('button[type="submit"] svg').removeClass("fa-spin");
                    Swal.fire(
                        'Məlumat',
                        'Haqqımızda məlumatları uğurla yaradıldı',
                        'success'
                    )
                }
                else {
                    console.log(data, textStatus, xhr);
                    alert("Xəta baş verdi...")
                }
            }
        })
    })
}


if(window.location.pathname === "/dashboard/orders") {
    var ordersTable = new gridjs.Grid({
        columns: ["Tam ad", "Məhsul adı", "Məhsul qiyməti", "Məhsul sayı", "Sifariş tarixi", "Status", "---"],
        server: {
            url: `${api_base_url}/admin/get/checkout`,
            then: data => data.map(card =>
                [
                    `${card.user.name} ${card.user.lastname}`,
                    `${card.product.name_az}`,
                    `${card.product.price}`,
                    card.productCount,
                    gridjs.html(`${moment(card.createdAt).local('az').format('LL')} <span style="display: none;">${$("#loader-cs").hide()}</span>`),
                    gridjs.html(`${card.status === false ? '<b class="text-danger">Icra edilir</b>' : '<b class="text-success">Tamamlanıb</b>'}`),
                    gridjs.html(`
                    <button class="btn btn-sm btn-success DetailedInfoOrder" 
                    data-user-id="${card.userId}"
                    data-user-fullname="${card.user.name} ${card.user.lastname}"
                    data-user-phone="${card.user.phone}"
                    data-user-email="${card.user.email}"
                    data-user-regdate="${moment(card.user.createdAt).local('az').format('LL')}"
                    data-user-adress="${card.user.adress}"
                    data-product-name="${card.product.name_az}"
                    data-product-price="${card.product.price}"
                    data-order-id="${card.uniq_id}"
                    data-order-count="${card.productCount}"
                    data-order-addr="${card.orderAdress}"
                    data-order-status="${card.status}">
                    <i class="fa fa-eye"></i></button>`),
                ])
          },
          pagination: { limit: 7 }
    }).render(document.getElementById("ordersTable"));
    $(document).on("click", ".DetailedInfoOrder", function(e) {
        e.preventDefault();
        $(`input[name="order_uniq_id"]`).val($(this).data("order-id"))
        $("#OrderInfoModal").modal("show");
        $("#order_username_input").val($(this).data("user-fullname"))
        $("#order_email_input").val($(this).data("user-email"))
        $("#order_phone_input").val($(this).data("user-phone"))
        $("#order_address_input").val($(this).data("user-adress"))
        $("#order_registerdate_input").val($(this).data("user-regdate"))
        //Product
        $("#order_product_name_input").val($(this).data("product-name"))
        $("#order_product_price_input").val(`${$(this).data("product-price")} AZN`);
        $("#order_count_input").val($(this).data("order-count"))
        $("#order_ch_address_input").val($(this).data("order-addr"))
        let ord_st__ = $(this).data("order-status");
        $("#order_status_dropdown .order_status_init")
        .text(`${ord_st__ == false ? 'Icra edilir' : 'Tamamlanıb'}`)
    })
    $("#order_status_dropdown .dropdown-item").click(function() {
        let slct_status__ = $(this).data("status");
        $("#order_status_dropdown .order_status_init").text($(this).text());
        $.ajax({
            type: "PUT",
            url: `${api_base_url}/stroyka/update/checkoutStatus`,
            data: {
                uniq_id: $(`input[name="order_uniq_id"]`).val(),
                status: slct_status__
            },
            success: function(data, textStatus, xhr) {
                if(xhr.status === 200) {
                    Swal.fire(
                        'Məlumat',
                        'Status yeniləndi',
                        'success'
                    );
                    ordersTable.forceRender(document.getElementById("ordersTable"));
                }
                else {
                    console.log(data, textStatus, xhr);
                    alert("Xəta baş verdi...")
                }
            }
        })
    })
}

var ProducDescriptionAZEditor = [];
var ProducDescriptionENEditor = [];
var ProducDescriptionRUEditor = [];
var ProductSpecificationAZEditor = [];
var ProductSpecificationENEditor = [];
var ProductSpecificationRUEditor = [];
var ProductListTable;
function detectCheckbox(element) {
    return ($(element).prop('checked') == true ? 1 : 0);
}
if(window.location.pathname === "/dashboard/products") {
    //Product List Table
    var ProductListTable = new gridjs.Grid({
        columns: ["Məhsulun adı", "Qiyməti", "Status", "---"],
        pagination: {
            enabled: true,
            limit: 3,
            summary: false
        },
        server: {
            url: `${api_base_url}/stroyka/get/products/all`,
            then: data => data.map(list => 
                [
                    list.name_az,
                    `${list.price}`,
                    `${list.status}`,
                    gridjs.html(`<button class="btn btn-sm btn-danger DeleteProductBTN" data-uniq-id="${list.uniq_id}">Sil</button>`)
                ])
          }
      }).render(document.getElementById("ProductListTable"));
    // Clean sub category while selecting up 
    $(`select[name="up_cat_for_product"]`).on("change", function(e) {
        $(`select[name="sub_cat_for_product"]`).html('');
        $(`select[name="sub_cat_for_product"]`).append('<option selected value="0">Seçimi edin</option>');
        $(`select[name="alt_cat_for_product"]`).html('');
        $(`select[name="alt_cat_for_product"]`).append('<option selected value="0">Seçimi edin</option>');
        if($(this).val() !== "0") {
            $.ajax({
                type: "GET",
                url: `${api_base_url}/stroyka/get/getSubCatsByCatSlug/${$(`select[name="up_cat_for_product"]`).find(':selected').data("slug")}`,
                success: function (data, textStatus, xhr) {
                    $(data).each(function(k,v) {
                        $(`select[name="sub_cat_for_product"]`)
                        .append(`<option data-slug="${v.slug}" value="${v.uniq_id}">AZ: ${v.name_az} | EN:  ${v.name_en} | RU:  ${v.name_ru}</option>`);
                    })
                }
            })
        }
    });
    // Clean alt category while selecting sub 
    $(`select[name="sub_cat_for_product"]`).on("change", function(e) {
        $(`select[name="alt_cat_for_product"]`).html('');
        $(`select[name="alt_cat_for_product"]`).append('<option selected value="0">Seçimi edin</option>');
        if($(this).val() !== "0") {
            $.ajax({
                type: "GET",
                url: `${api_base_url}/stroyka/get/altcategoriesBySubCatID/${$(`select[name="sub_cat_for_product"]`).find(':selected').data("slug")}`,
                success: function (data, textStatus, xhr) {
                    $(data).each(function(k,v) {
                        $(`select[name="alt_cat_for_product"]`)
                        .append(`<option data-slug="${v.slug}" value="${v.uniq_id}">AZ: ${v.name_az} | EN:  ${v.name_en} | RU:  ${v.name_ru}</option>`);
                    })
                }
            })
        }
    });
    
    function collectProductDescription() {
        ProducDescriptionAZEditor = []
        ProducDescriptionENEditor = []
        ProducDescriptionRUEditor = []
        $("#descriptionListElAZ .list-of-description").each(function(key, val) {
            ProducDescriptionAZEditor.push({
                title: $(val).find('span').eq(0).text(),
                context: $(val).find('span').eq(1).text()
            })
        })
        $("#descriptionListElEN .list-of-description").each(function(key, val) {
            ProducDescriptionENEditor.push({
                title: $(val).find('span').eq(0).text(),
                context: $(val).find('span').eq(1).text()
            })
        })
        $("#descriptionListElRU .list-of-description").each(function(key, val) {
            ProducDescriptionRUEditor.push({
                title: $(val).find('span').eq(0).text(),
                context: $(val).find('span').eq(1).text()
            })
        })
        return 'OK';
    }
    function collectProductSpecifications() {
        ProductSpecificationAZEditor = [];
        ProductSpecificationENEditor = [];
        ProductSpecificationRUEditor = [];
        $("#specificationListElAZ .list-group .list-group-item").each(function(key, val) {
            ProductSpecificationAZEditor.push({
                title: $(val).find('span').eq(0).text(),
                context: $(val).find('span').eq(1).text()
            })
        })
        $("#specificationListElEN .list-group .list-group-item").each(function(key, val) {
            ProductSpecificationENEditor.push({
                title: $(val).find('span').eq(0).text(),
                context: $(val).find('span').eq(1).text()
            })
        })
        $("#specificationListElRU .list-group .list-group-item").each(function(key, val) {
            ProductSpecificationRUEditor.push({
                title: $(val).find('span').eq(0).text(),
                context: $(val).find('span').eq(1).text()
            })
        })
        return 'OK';
    }
    $("#NewProductForm").submit(function(e) {
        e.preventDefault();
        collectProductDescription()
        collectProductSpecifications()
        var decription__ = {
            az: ProducDescriptionAZEditor,
            en: ProducDescriptionENEditor,
            ru: ProducDescriptionRUEditor
        };
        var specification__ = {
            az: ProductSpecificationAZEditor,
            en: ProductSpecificationENEditor,
            ru: ProductSpecificationRUEditor
        }
        $(`input[name="product_description`).val(JSON.stringify(decription__));
        $(`input[name="product_specification`).val(JSON.stringify(specification__));
        $(`input[name="isfeatured_real_input"]`).val(detectCheckbox($(`input[name="isfeatured"]`)));
        $(`input[name="isBestseller_real_input"]`).val(detectCheckbox($(`input[name="isBestseller"]`)));
        var body__ = new FormData();
        body__.append("name_az", $(`input[name="paroduct_name_az_input"]`).val());
        body__.append("name_en", $(`input[name="paroduct_name_en_input"]`).val());
        body__.append("name_ru", $(`input[name="paroduct_name_ru_input"]`).val());
        $.each(document.getElementById('formFiles').files, function(i, file) {
            body__.append('images', file);
        });
        let slug_text__ = $(`input[name="paroduct_slug_input"]`).val().replace(' ', '-');
        body__.append("slug", slug_text__.toLowerCase());
        body__.append("status", "active");
        body__.append("weight", $(`input[name="product_weight_input"]`).val());
        body__.append("model", $(`input[name="product_model_input"]`).val());
        body__.append("code", $(`input[name="product_code_input"]`).val());
        body__.append("type", "0");
        body__.append("price", $(`input[name="product_price_input"]`).val());
        body__.append("manufacturer", $(`input[name="product_manufacturer_input"]`).val());
        body__.append("isBestseller", $(`input[name="isBestseller_real_input"]`).val());
        body__.append("isFeatured", $(`input[name="isfeatured_real_input"]`).val());
        body__.append("altcat_id", $(`select[name="alt_cat_for_product"]`).val());
        body__.append("subcat_id", $(`select[name="sub_cat_for_product"]`).val());
        body__.append("cat_id", $(`select[name="up_cat_for_product"]`).val());
        body__.append("specification", $(`input[name="product_specification"]`).val());
        body__.append("description", $(`input[name="product_description"]`).val());
        $.ajax({
            type: "POST",
            url: `${api_base_url}/admin/createNewProduct`,
            data: body__,
            processData: false,
            contentType: false,
            success: function(data, textStatus, xhr) {
                if(xhr.status === 201) {
                    Swal.fire(
                        'Məlumat',
                        'Məhsul uğurla əlavə edildi',
                        'success'
                    );
                    $("#NewProductForm")[0].reset()
                    $("#profile-tab").click();
                    ProductListTable.forceRender(document.getElementById("ProductListTable"));
                }
                else {
                    console.log(data, textStatus, xhr);
                    alert("Xəta baş verdi...")
                }
            }
        });
    })
    $("#NewProductForm .input-group button").click(function() {
        let el__ = $(this);
        if($(el__).siblings(".spec-title-input").val().length > 1 && $(el__).siblings(".spec-context-input").val().length > 1) {
            let tmp_dom__ = `
            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                <span>${$(el__).siblings(".spec-title-input").val()}</span>: <span>${$(el__).siblings(".spec-context-input").val()}</span>
                <button type="button" class="btn btn-sm btn-danger RemoveFronListSPEC"><i class="fa fa-trash"></i></button>
            </div>`;
            $(el__).parents().eq(4).find(".list-group").append(tmp_dom__)
        }
    })
    $(document).on("click", ".RemoveFronListSPEC", function() { $(this).parent().remove(); })
    $(".AddDescriptionBTN").click(function(e) {
        let el__ = $(this);
        let tmp_dom__ = `
        <div class="card mt-1">
            <div class="card-header d-flex justify-content-between align-items-start">
                <span>${$(el__).parents().eq(1).find(".spec-title-input").val()}</span>
                <button type="button" class="btn btn-sm btn-danger DeleteDescriptionBTN"><i class="fa fa-trash"></i></button>
            </div>
            <div class="card-body"><span>${$(el__).parents().eq(1).find(".spec-context-input").val()}</span></div>
        </div>`;
        if($(el__).parents().eq(1).find(".spec-title-input").val().length > 1 && $(el__).parents().eq(1).find(".spec-context-input").val().length > 1) {
            $(el__).parents().eq(1).siblings(".list-of-description").append(tmp_dom__)
            $(el__).parents().eq(1).find(".spec-title-input").val('')
            $(el__).parents().eq(1).find(".spec-context-input").val('')
        }
    });
    $(document).on("click", ".DeleteDescriptionBTN", function() {  $(this).parent().parent().remove(); })
    $(document).on("click", ".DeleteProductBTN", function(e) {
        var tmp_id__ = $(this).data("uniq-id");
        $.ajax({
            type: "DELETE",
            url: `${api_base_url}/admin/delete/products`,
            data: {
                uniq_id: tmp_id__
            },
            success: function(data, textStatus, xhr) {
                if(xhr.status === 200) {
                    Swal.fire(
                        'Məlumat',
                        'Məhsul silindi',
                        'success'
                    )
                }
                else {
                    console.log(data, textStatus, xhr);
                    alert("Xəta baş verdi...")
                }
            }
        })
    })
}

if(window.location.pathname === "/dashboard/form-request") {
    var formRequest = new gridjs.Grid({
        columns: ["Tam ad", "Email", "Əlaəq nömrəsi", "Mesaj", "Mənbə"],
        pagination: {
            enabled: true,
            limit: 3,
            summary: false
        },
        server: {
            url: `${api_base_url}/admin/get/contacUs`,
            then: data => data.map(card =>
                [
                    `${card.name}`,
                    `${card.email}`,
                    `${card.phone}`,
                    card.message,
                    card.source,
                ])
          }
      }).render(document.getElementById("formRequest")); 
}

if(window.location.pathname === "/dashboard/contact") {
    var uniq_id__ = $(`input[name="uniq_id"]`)
    var adrress_az__ = $(`input[name="addressInputAZ"]`)
    var email__ = $(`input[name="emailInput"]`)
    var number_1__ = $(`input[name="Number1Input"]`)
    var number_2__ = $(`input[name="Number2Input"]`)
    var open_times__ = $(`input[name="OpenTimesInput"]`)
    var coordinates__ = $(`input[name="CoordinatesInput"]`)

    function getInfoData() {
        var rtr__ = $.ajax({
            type: "GET",
            url: `${api_base_url}/admin/get/adress`,
            success: function(data, textStatus, xhr) {
                if(xhr.status === 200) {
                    uniq_id__.val(data[0].uniq_id);
                    adrress_az__.val(data[0].adress);
                    email__.val(data[0].email);
                    number_1__.val(data[0].number1);
                    number_2__.val(data[0].number2);
                    open_times__.val(data[0].openTimes);
                    coordinates__.val(data[0].coordinates);
                }
                else {
                    console.log(data, textStatus, xhr);
                    alert("Xəta baş verdi...")
                }
            }
        })
        return rtr__;
    }
    getInfoData()
    $("#InfoUpdateForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "PUT",
            url: `${api_base_url}/admin/update/adress`,
            data: {
                "uniq_id": uniq_id__.val(),
                "adress": adrress_az__.val(),
                "email": email__.val(),
                "number1": number_1__.val(),
                "number2": number_2__.val(),
                "openTimes": open_times__.val(),
                "coordinates": coordinates__.val()
              },
            success: function(data, textStatus, xhr) {
                if(xhr.status === 200) {
                    Swal.fire(
                        'Məlumat',
                        'Əlaqə məlumatları uğurla yeniləndi',
                        'success'
                    );
                    getInfoData()
                }
                else {
                    console.log(data, textStatus, xhr);
                    alert("Xəta baş verdi...");
                }
            }
        })
    })
}

if(window.location.pathname === "/dashboard/team") {
    var teamTable = new gridjs.Grid({
        columns: ["Tam ad", "Peşə AZ", "Peşə EN", "Peşə RU", "---"],
        server: {
            url: `${api_base_url}/stroyka/get/team`,
            then: data => data.map(card =>
                [
                    `${card.title}`,
                    card.profession.az,
                    card.profession.en,
                    card.profession.ru,
                    gridjs.html(`
                        <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-danger DeleteTeamBTN"><i class="fa fa-trash"></i> Sil</button>
                        <button type="button" data-id="${card.uniq_id}" class="btn btn-sm btn-warning EditTeamBTN" data-action="edit"><i class="fa fa-pencil"></i></button>
                    `)
                ])
          }
    }).render(document.getElementById("teamTable")); 
    $("#AddNewTeamForm").submit((e) => {
        e.preventDefault();
        if( $(`input[name="name_input"]`).val().length > 2 &&
            $(`input[name="profession_az_input"]`).val().length > 2 &&
            $(`input[name="profession_en_input"]`).val().length > 2 &&
            $(`input[name="profession_ru_input"]`).val().length > 2) {
            $("#loader-cs").show();
            let team_prof__ = {
                    az: $(`input[name="profession_az_input"]`).val(),
                    en: $(`input[name="profession_en_input"]`).val(),
                    ru: $(`input[name="profession_ru_input"]`).val()
            };
            let fd__ = new FormData();
            fd__.append("title", $(`input[name="name_input"]`).val());
            fd__.append('image', document.getElementById('imageFileInput').files[0]);
            fd__.append('profession', JSON.stringify(team_prof__));
    
            $.ajax({
                type: "POST",
                url: `${api_base_url}/admin/create/new/team`,
                data: fd__,
                processData: false,
                contentType: false,
                success: function(data, textStatus, xhr) {
                    if(xhr.status === 200) {
                        document.getElementById("AddNewTeamForm").reset();
                        $("#AddTeamModal").modal("hide")
                        teamTable.forceRender(document.getElementById("teamTable")); 
                        Swal.fire(
                            'Məlumat',
                            'Yeni şəxs uğurla əlavə edildi',
                            'success'
                        )
                        $("#loader-cs").hide();
                    }
                    else {
                        console.log(data, textStatus, xhr);
                        alert("Xəta baş verdi...")
                    }
                }
            })
        }
    })
    $(document).on("click", ".DeleteTeamBTN", function(e) {
        let id__ = $(this).data("id")
        $.ajax({
            type: "DELETE",
            url: `${api_base_url}/admin/delete/team`,
            data: {
                uniq_id: id__
            },
            success: function(data, textStatus, xhr) {
                if(xhr.status === 200) {
                    teamTable.forceRender(document.getElementById("teamTable")); 
                    Swal.fire(
                        'Məlumat',
                        'Şəxs silindi',
                        'success'
                    )
                }
                else {
                    console.log(data, textStatus, xhr);
                    alert("Xəta baş verdi...")
                }
            }
        })
    })
}

$(document).ready(function() {
    setTimeout(() => {
        $("#loader-cs").hide();
    }, 500);
});