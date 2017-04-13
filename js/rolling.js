/*
					 User:ZQQ
					 creatDate:2017-04-07
					 * */
var luck = {
	width: 220, //宽度
	height: 134, //高度
	spacing: 30, //间距
	col: 3, //列数
	row: 2, //行数
	line: 2, //之间的差距
	index: -1, //当前转动到哪个位置，起点位置
	prizeCount: 6, //总共有多少个位置
	timer: 0, //setTimeout的ID，用clearTimeout清除
	speed: 20, //初始转动速度
	times: 0, //转动次数
	cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize: 2, //中奖位置
	creatEle: function() {
		var liStr = '';
		for(var i = 1; i <= this.prizeCount; i++) {
			//						liStr+='<li class="luck-unit luck-unit-'+i+'"><img src="images/'+((i+1)%8)+'.png"/></li>';
			//						if(i<4)
			/*获得普通代金券图片*/
			liStr += '<li class="luck-unit luck-unit-' + i + '"><img src="http://www.wanbu.com.cn/upload_files/goods/1/58d8c1a887e19.jpg"/></li>';
			/*获得健康币图片*/
			//							liStr+='<li class="luck-unit  luck-unit-'+i+'"><span>20</span><img src="images/coin10.jpg"/></li>';
			/*谢谢参与*/
			//							liStr+='<li class="luck-unit  luck-unit-'+i+'"><img src="images/thanks'+(this.prizeCount>8?10:8)+'.jpg"/></li>';
			//						else
			//							liStr+='<li class="rxwb"></li>';
		}
		$('#prizeWrap').html(liStr).show();
	},
	//初始化
	init: function(id) {
		if(this.prizeCount < 9) {
			this.width = 220;
			this.height = 134;
		} else {
			this.width = 190;
			this.height = 122;
		}
		this.calcCount();
		this.creatEle();
		this.calcPos();
		if($("#" + id).find(".luck-unit").length > 0) {
			$luck = $("#" + id);
			$units = $luck.find(".luck-unit");
			this.obj = $luck;
			this.count = $units.length;
			$luck.find(".luck-unit-" + (this.index + 1)).addClass("active");
		};
	},
	//计算列、行、差距数
	calcCount: function() {
		if(this.prizeCount <= 6) {
			this.col = 3;
			this.row = 2;
			this.prizeCount = 6;
			$('.hrefInfo').css({
				'width': '824px'
			});
			$('#goWrap').addClass('goWrap6 goWrap8').show();
			$('#luck').css({
				'background-image': 'images/cj_8.png'
			});
		} else if(this.prizeCount > 6 && this.prizeCount <= 8) {
			this.col = 3;
			this.row = 3;
			this.prizeCount = 8;
			$('.hrefInfo').css({
				'width': '824px'
			});
			$('#luck').css({
				'background-image': 'images/cj_8.png'
			});
			$('#goWrap').addClass('goWrap8').removeClass('goWrap6').show();
		} else if(this.prizeCount > 8) {
			this.col = 4;
			this.row = 3;
			this.prizeCount = 10;
			$('.hrefInfo').css({
				'width': '950px'
			});
			$('#luck').css({
				'width': '950px',
				'height': '530px',
				'background-image': 'url(images/cj_10.png)'
			});
			$('#goWrap').addClass('goWrap8').show();
		}
		this.line = this.row - 2;
	},
	//计算单元位置
	calcPos: function() {
		$('#prizeWrap').css({
			width: this.col * this.width + (this.col - 1) * this.spacing,
			height: this.row * this.height + (this.row - 1) * this.spacing
		});
		if(this.prizeCount > 8) {
			$('#prizeWrap li img,#prizeWrap li').addClass('w10');
		}
		$('#prizeWrap li').each(function(index) {
			if(index >= 0 && index <= (luck.col - 1)) {
				$(this).css({
					top: 0,
					left: index * luck.width + index * luck.spacing
				});
			} else if(index >= luck.col && index <= (luck.col + luck.line - 1)) {
				$(this).css({
					top: ((index + 1 - luck.col)) * (luck.height + luck.spacing) - 4,
					right: -8
				});
			} else if(index >= (luck.col + luck.line) && index <= (2 * luck.col + luck.line - 1)) {
				$(this).css({
					bottom: 0,
					right: (index - ((luck.col + luck.line))) * (luck.width + luck.spacing) - 8
				});
			} else {
				$(this).css({
					left: 0,
					bottom: (index - (2 * luck.col + luck.line - 1)) * (luck.height + luck.spacing) - 4
				});
			}
		});
	},
	//逐次添加、删除样式
	roll: function() {
		var index = this.index;
		var prizeCount = this.prizeCount;
		var luck = this.obj;
		$(luck).find(".luck-unit-" + (index + 1)).removeClass("active");
		index += 1;
		if(index > prizeCount - 1) {
			index = 0;
		};
		$(luck).find(".luck-unit-" + (index + 1)).addClass("active");
		this.index = index;
		return false;
	},
	//速度计算
	speedding: function() {
		luck.times += 1;
		luck.roll();
		if(luck.times > luck.cycle + 10 && luck.prize == luck.index) {
			clearTimeout(luck.timer);
			luck.prize = -1;
			luck.times = 0;
			click = false;
			setTimeout(function() {
				//							$('.thanksTip,.mask').show();
				$('.winning,.mask').show();
			}, 800);
		} else {
			if(luck.times < luck.cycle) {
				luck.speed -= 10;
			} else {
				if(luck.times > luck.cycle + 10 && ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)) {
					luck.speed += 110;
				} else {
					luck.speed += 20;
				}
			}
			if(luck.speed < 40) {
				luck.speed = 40;
			};
			console.log(luck.times + '----' + luck.speed + '-----' + luck.prize);
			luck.timer = setTimeout(luck.speedding, luck.speed);
		}
		return false;
	},
	stop: function(index) {
		this.prize = index;
		return false;
	},
	s:1,
	listScroll: function() {
		var listPanel = $('#listWrap ul');
		var z = 0; //向上滚动top值
		function up() { //向上滚动
			if(luck.s&&listPanel.find('li').length * listPanel.find('li:first').height() > $('#listWrap').height())
				listPanel.animate({ //中奖结果
					'top': (z - 25) + 'px'
				}, 1500, 'linear', function() {
					listPanel.css({
							'top': '0px'
						})
						.find("li:first").appendTo(listPanel);
					up();
				});
		}
		up();
	}
};

var click = false;
window.onload = function() {
	luck.cycle = 80;
	luck.prizeCount = 10;
	luck.init('luck');
	$(".go").click(function() {
		if(click) {
			return false;
		} else {
			luck.stop(5);
			luck.speed = 200;
			luck.speedding();
			click = true;
			return false;
		}
	});
	$('#know').click(function() {
		$('.thanksTip,.mask').hide();
	});
	$('.closeWin').click(function() {
		$('.winning,.mask').hide();
	});
	$('.closePrize').click(function() {
		$('.allMyPrize,.mask').hide();
	});
	$('.myPrize').click(function() {
		$('.allMyPrize,.mask').show();
	});
	luck.listScroll();
};