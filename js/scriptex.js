//헤더
$(function(){
    const $gnb = $('header>nav>.gnb>li');
    const $lnb = $('header>nav>.gnb>li>ul');
    let nowIdx = 0;

    $gnb.on('mouseenter', function(){
        nowIdx = $gnb.index(this);
        
        $lnb.eq(nowIdx).fadeIn(200);

        $gnb.eq(nowIdx).children('a').append('<span class=bar></span>');

        const barWidth = $gnb.eq(nowIdx).find('span').first().width();

        $gnb.find('.bar').css({
            width: barWidth,
            'margin-left': -barWidth/2
        });
        
    });

    $gnb.on('mouseleave', function(){
        $('.bar').remove();
        $lnb.hide();
    });
});

//메인 슬라이드
$(function(){
    const $slide = $('#slide-sect>.slide');
    const $btnArrow = $('#slide-sect>.slide>.arrow>a');
    const $slideImg = $('#slide-sect>.slide>.slide-bannr');
    const $imgWidth = $slideImg.children('li').width();
    const $liNum = $slideImg.children('li').length;

    const $copyFirst = $slideImg.children('.imgfrst').clone();
    const $copyLast = $slideImg.children('.imgthrd').clone();

    let nowIdx = 1;

    $(window).on('load', function(){
        $slideImg.append($copyFirst);
        $slideImg.prepend($copyLast);
    });

    $slideImg.css({
        width : $imgWidth * ($liNum+2)
    });
    

    //슬라이드에 마우스 올렸을 때 좌우버튼 나오도록
    $slide.on({
        'mouseenter': function(){
            $btnArrow.first().stop().animate({
                left : 0
            }, 200);
            $btnArrow.last().stop().animate({
                right : 0 
            }, 200);
        }
        ,
        'mouseleave' : function(){
            $btnArrow.first().stop().animate({
                left : -42
            }, 200);
            $btnArrow.last().stop().animate({
                right : -42 
            }, 200);
        }     
    });




    //무한 슬라이드
    //다음(넥스트, 오른쪽) 버튼 클릭
    $btnArrow.last().on('click', function(evt){
        evt.preventDefault();
        
        if(nowIdx<4){
            $slideImg.stop().animate({
                left: -$imgWidth * (nowIdx+1) 
            }, 200);
            nowIdx++;
        }
        
        if(nowIdx==3){
            setTimeout(function(){
                $slideImg.stop().animate({
                    left: 0
                }, 0);
                nowIdx=0;
            }, 200);
        }
    });


    $btnArrow.first().on('click', function(evt){
        evt.preventDefault();     
        console.log($slideImg);   
     
        if(nowIdx>0){
            $slideImg.stop().animate({
                left: -$imgWidth * (nowIdx-1)
            },200);
            nowIdx--;
        }
        
        if(nowIdx===0){
            setTimeout(function(){
                $slideImg.stop().animate({
                    left: -$imgWidth * 3
                },0);
                nowIdx=3;
            }, 201);
        }
    });
   


    //기존슬라이드
    // $btnArrow.first().on('click', function(evt){
    //     evt.preventDefault();
    //     if(nowIdx>0){
    //         nowIdx--;
    //     }else{
    //         nowIdx=2;
    //     }
    //     console.log(nowIdx);
    //     $slideImg.stop().animate({
    //         left : -940 * nowIdx
    //     }, 1000);
    // });

    // $btnArrow.last().on('click', function(evt){
    //     evt.preventDefault();
    //     if(nowIdx<2){
    //         nowIdx++;
    //     }else{
    //         nowIdx=0;
    //     }
    //     console.log(nowIdx);
    //     $slideImg.stop().animate({
    //         left : -940 * nowIdx
    //     }, 1000);
    // });

});

//서브 슬라이드
$(function(){

    const $banner = $('#cont-02>.recruit-banner>.slides>.slides-bannr>li');
    const $btnPlayStop = $('#cont-02>.recruit-banner>.slides>.slides-indicator>a');
    
    let nowIdx = 0;
    let oldIdx = null;
    let intervalKey = null;

    const bannerMove = function(){
        oldIdx = nowIdx;

        if(nowIdx==0){
            nowIdx=1;
        }else{
            nowIdx=0;
        }

        $banner.eq(oldIdx).stop().fadeOut(1000);
        $banner.eq(nowIdx).stop().fadeIn(1000);
    };

    const bannerAuto = function(){
        intervalKey = setInterval(function(){
            bannerMove();
        }, 4000);
    };

    // $(window).on('load', function(){
    //     bannerAuto();
    // });

    bannerAuto();

    $banner.first().children('a').on('click', function(evt){
        evt.preventDefault();
        $banner.first().fadeOut(1000);
        $banner.last().fadeIn(1000);
    });

    $banner.last().children('a').on('click', function(evt){
        evt.preventDefault();
        $banner.first().fadeIn(1000);
        $banner.last().fadeOut(1000);
    });


    $btnPlayStop.first().on('click', function(evt){
        evt.preventDefault();
        bannerAuto();
    });

    $btnPlayStop.last().on('click', function(evt){
        evt.preventDefault();
        clearInterval(intervalKey);
    });

});

 //옵션박스
$(function(){
    const $selecName = $('#cont-03>.selector>.select>form[name=selecCompanyName]');
    const $name = $('#cont-03>.selector>.select>form>.select-name>ul>li>a');
    const $nameList = $('#cont-03>.selector>.select>form>.select-name>ul');
    const $selecDiv = $('#cont-03>.selector>.select>form[name=selecCompanyDiv]');
    const $divList = $('#cont-03>.selector>.select>form>.select-div>ul');
    const $div = $('#cont-03>.selector>.select>form>.select-div>ul>li>a');
    const $btn = $('#cont-03>.selector>.select>button');
    let nowIdx = 0;
    
    
    $selecName.on('click', function(){
        $nameList.toggle();
        $selecDiv.toggle();

    });

    $selecName.on('mouseleave', function(){
        $nameList.hide();
        $selecDiv.show();
    });

    //위에 글자 바뀌도록
    $name.on('click', function(evt){
        evt.preventDefault();
        const selectedName = $(this).text();
        $('#selName').val(selectedName);
        $('#selDiv').val('선택하세요');
    });

    //글자 바뀐대로 아래 선택하세요 내용 바뀌도록
    $name.on('click', function(evt){
        evt.preventDefault();
        nowIdx = $name.index(this);
        $divList.eq(nowIdx).children().hide();
    });

    $selecDiv.on('click', function(){
        $divList.eq(nowIdx).toggle();
        $divList.eq(nowIdx).children().show();

        $divList.css({
            height : $divList.eq(nowIdx).children().length * 30
        });
    });

    //아래 글자 선택하면 바뀌도록
    $div.on('click', function(evt){
        evt.preventDefault();
        const selectedName = $(this).text();
        $('#selDiv').val(selectedName);
    });

    //유효성 검사
    $btn.on('click', function(){
        if($('#selDiv').val()=='선택하세요'){
            alert('부서를 선택해주세요');
        }
    });

});