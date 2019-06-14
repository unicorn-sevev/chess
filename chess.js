$(function(){
    let box = $('.box');
    let flag = true;
    let black = {},white = {};
    let blank = {};
    let ai = true;
    for (let i = 0;i < 15;i++){
        for (let j = 0;j < 15;j++){
            $('<div>').addClass('chess').attr('id',i + '_' +j).appendTo(box);
            blank[i + '_' + j] = true;
        }
    }

    box.on('click','.chess',function () {
        let _this = $(this);
        if (_this.hasClass('black') ||_this.is('.white')) {
            return;
        }
        //开关
        flag = !flag;
        let coords = _this.attr('id');

        if (flag){
            black[coords] = true;
            delete  blank[coords];
            _this.addClass('black');
            if(isSuccess(black,coords) >= 5){
                console.log('black-success');
                box.off('click');
            }
        } else{
            white[coords] = true;
            delete  blank[coords];
            _this.addClass('white');
            console.log("111"+coords);
            if(isSuccess(white,coords) >= 5){
                console.log('white-success');
                box.off('click');
            }
            if (ai) {
                let pos = aifn();
                black[pos] = true;
                delete  blank[pos];
                $('#' + pos).addClass('black');
                if(isSuccess(black,pos) >= 5){
                    console.log('black-success');
                    box.off('click');
                }
                flag = !flag;
            }
        }
    });
    function  aifn() {
        let blankScore = 0 , whiteScore = 0;
        let pos1 = '' , pos2 = '';
        for (let i in blank) {
            let score = isSuccess(black,i);
            if (score >= blankScore){
                blankScore = score;
                pos1 = i;
            }
        }
        for (let i in blank) {
            let score = isSuccess(white,i);
            if (score >= whiteScore){
                whiteScore = score;
                pos2 = i;
            }
        }
        return blankScore >= whiteScore ? pos1 : pos2


    }
    function isSuccess(obj,coords) {
        let sp = 1 ,cz = 1, yx = 1 , zx = 1 ;
        console.log(coords);
        let [x , y] = coords.split('_');
        let i = x * 1,j = y * 1;

        while(obj[i + '_' +(++j)]){
            sp++;
        }
        j = y * 1;
        while(obj[i + '_' + (--j)]){
            sp++;
        }
        //cz
        j = y * 1;
        while(obj[(++i) + '_' +j]){
            cz++;
        }
        i = x * 1;
        while(obj[(--i) + '_' + j]){
            cz++;
        }
        i = x * 1;
        //yx
        j = y * 1;
        while(obj[(--i) + '_' +(++j)]){
            yx++;
        }
        i = x * 1;j = y * 1;
        while(obj[(++i) + '_' + (--j)]){
            yx++;
        }
        i = x * 1; j = y * 1;
        //zx
        while(obj[(--i) + '_' +(--j)]){
            zx++;
        }
        i = x * 1;j = y * 1;
        while(obj[(++i) + '_' + (++j)]){
            zx++;
        }
        return Math.max(sp,cz,zx,yx)

    }
});