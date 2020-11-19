var search = window.location.search;
if(search == '?t=1') {
	$('.show_answer').hide();
	$('#check_dui').hide();
	$('#check_cuo').hide();
	$('#czst').hide();
}

/* 处理答案, 记录在 localStorage 中 */
var bb = $('#bb').val();
var storage = window.localStorage;
if (storage[bb]) {
    var answers = JSON.parse(storage[bb]);
    for (var key in answers) {
        $('#' + key).find('.answer_wrong').text(answers[key]);
        $radios = $('#' + key).find('input[type=radio]');
        answers[key] == 'A' ? $($radios.get(0)).prop('checked', true) : '';
        answers[key] == 'B' ? $($radios.get(1)).prop('checked', true) : '';
        answers[key] == 'C' ? $($radios.get(2)).prop('checked', true) : '';
        answers[key] == 'D' ? $($radios.get(3)).prop('checked', true) : '';
    }
} else {
    storage[bb] = '';
    var answers = {};
}

/* 重做时清单 localStorage 中的答案 */
$('#czst').click(function () {
    var ck = confirm('确定重做吗?')
    if (ck) {
        storage[bb] = '';
        $('.st_content_txt').find('.answer_wrong').text('');
        $('.st_content_txt').find('input[type=radio]').prop('checked', false);
    }
});

/* 处理选项 */
$('.st_content_txt_xx li').click(function () {
    $parent = $(this).parents('.st_content_txt_xx');
    $radios = $parent.find('input[type=radio]');
    $radios.prop('checked', false);
    $(this).find('input').prop('checked', true);

    var answer = $(this).text().split('：')[0].trim();
    $parent.next().next().find('.answer_wrong').text(answer);

    var id = $parent.parents('.st_content_txt').attr('id');
    answers[id] = answer;
    storage[bb] = JSON.stringify(answers);
});

// 显示解析和答案
$('.show_answer button').click(function () {
    $parent = $(this).parents('.st_content_txt');
    $parent.find('.jxxq_answer').toggle();
    $parent.find('.jxxq_jx_txt').toggle(); 
});

// 根据题号过滤题目
$('#search').change(function () {
    var num = $('#search').val().trim();
    if (num == '') {
        $('.st_content_txt').css('display', 'block');
    } else {
        var tm = '#tm' + num;
				console.log(tm);
        $('.st_content_txt').css('display', 'none');
        $(tm).css('display', 'block');
    }
});

$('#search-btn').click(function () {
    var num = $('#search').val().trim();
    if (num == '') {
        $('.st_content_txt').css('display', 'block');
    } else {
        var tm = '#tm' + num;
        $('.st_content_txt').css('display', 'none');
        $(tm).css('display', 'block');
    }
});

$('#reset-btn').click(function () {
    $('#search').val('');
    $('.st_content_txt').css('display', 'block');
});

// 过滤只显示对的题目
$('#check_dui').click(function () {
    $('.st_content_txt').each(function (i, ele) {
        var right = $(ele).find('.answer_right').text().trim();
        var wrong = $(ele).find('.answer_wrong').text().trim();
        if (right == wrong) {
            $(ele).show();
        } else {
            $(ele).hide();
        }
    });
});
// 过滤只显示错的题目
$('#check_cuo').click(function () {
    $('.st_content_txt').each(function (i, ele) {
        var right = $(ele).find('.answer_right').text().trim();
        var wrong = $(ele).find('.answer_wrong').text().trim();
        if (right == wrong || wrong == '') {
            $(ele).hide();
        } else {
            $(ele).show();
        }
    });
});
// 过滤只显示未做的题目
$('#check_wei').click(function () {
    $('.st_content_txt').each(function (i, ele) {
        var wrong = $(ele).find('.answer_wrong').text().trim();
        if (wrong == '') {
            $(ele).show();
        } else {
            $(ele).hide();
        }
    });
});
// 显示全部题目
$('#check_quan').click(function () {
    $('.st_content_txt').show();
});
// 统计完成情况
$('#check_tong').click(function () {
    var dui = 0;
    var cuo = 0;
    var wei = 0;

    $('.st_content_txt').each(function (i, ele) {
        var right = $(ele).find('.answer_right').text().trim();
        var wrong = $(ele).find('.answer_wrong').text().trim();
        console.log($(ele).find('answer_right'));
        console.log($(ele).find('answer_wrong'));
        if (right == wrong) {
            dui++;
        } else if (wrong == '') {
            wei++;
        } else {
            cuo++;
        }
    });

    $('#t_dui').text(dui);
    $('#t_cuo').text(cuo);
    $('#t_wei').text(wei);
});

/*  处理数据

$('.jxxq_jx_txt').each(function (i, ele) {
    $(ele).html($(ele).text());
});

$('.st_content_txt_tm').each(function (i, ele) {
    $(ele).removeAttr('id');
    $(ele).find('em').remove();
    var num = $(ele).find('span:first').text().replace('、', '');
    $(ele).parent('.st_content_txt').attr('id', 'tm' + num)
});

$('.st_content_txt_xx').each(function (i, ele) {
    $show = $('<div class="show_answer"><button type="button" class="btn btn-sm btn-primary">答案解析</button></div>');
    $(ele).after($show);
});

$('.st_content_txt input[type=radio]').removeAttr('checked');
$('.st_content_txt input[type=radio]').removeAttr('disabled');

$('.st_content_tit').remove();

*/


// $('.st_content_txt_xx').each(function (i, ele) {
//     $($(ele).find('input[type=radio]').get(0)).prop('checked', true);
//     $($(ele).find('input[type=radio]').get(0)).click();
// });


// var tms = [];
// $('.st_content_txt').each(function(i, ele){
// 	var id = $(ele).attr('id').replace('tm', '') * 1 - 1;
// 	tms[id] = $(ele);
// });

// $('.st_content_txt').remove();

// for(var i in tms) {
// 	var tm =  tms[i];
// 	$('#radio_anchor').append(tm);
// }