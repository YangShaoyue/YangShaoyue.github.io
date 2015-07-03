/*
 * 触发动画函数，以显示文章
 */
var smallScreen = window.innerWidth < 900;
var footer, copyright, c_font;
function animationTrigger() {
	$("#avatar a:nth-child(2)").remove();
	$("#avatar").addClass("avatar-animation");
	$("#author h1").remove();
	$("#author h2").addClass("subtitle-animation");
	$("#author h2").hide().delay(800).fadeIn(800);

	$("div.social-wrapper").addClass("social-animation").hide();
	$("div.social-wrapper").delay(800).fadeIn(800);

	$("#container").fadeIn(1000);

	$("footer").addClass("footer-animation1");

	if (!smallScreen) {
		footer = document.getElementById("footer");
		copyright = document.createElement("span");
		if (!copyright.getAttribute("class")) {
			copyright.setAttribute("class", "cr-font");
		}

		c_font = document.createElement("i");

		if (!c_font.getAttribute("class")) {
			c_font.setAttribute("class", "fa fa-copyright");
		}

		copyright.appendChild(c_font);
		footer.appendChild(copyright);
		
		$("footer #footer span.cr-font").click(function() {
			$("footer").toggleClass("footer-animation2");
		});
	}
	

	$("#avatar a").unbind("mouseenter");
	$("#avatar a").unbind("mouseleave");
}


$(document).ready(function() {
	// 头像切换
	$("#avatar a:nth-child(2) img").hide();

	$("#avatar a").mouseenter(function() {
		$("#avatar a:nth-child(1) img").stop().fadeOut(1000);
		$("#avatar a:nth-child(2) img").stop().fadeIn(1000);
	}).mouseleave(function() {
		$("#avatar a:nth-child(1) img").stop().fadeIn(1000);
		$("#avatar a:nth-child(2) img").stop().fadeOut(1000);
	});

	//  滑动触发动画
	// $("#all-articles i").mouseenter(function() {
	// 	animationTrigger();
	// });

	// 导航栏被点击时，改变导航栏颜色
	$("nav#nav-bar ul li").click(function() {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
	});
});

/*
 * 点击导航栏时如果未触发动画，则先触发动画
 */
(function wasTriggered() {
	var navBar = document.getElementById("nav-bar"),
		navUl = navBar.getElementsByTagName("ul")[0],
		navLi = navUl.getElementsByTagName("li");
	for (var i=0, len=navLi.length; i < len; i++) {
		if (navLi[i].nodeType == 1) {
			navLi[i].addEventListener("click", function() {
				// 点击导航栏之前判断动画是否已触发（即h1是否还存在）
				if (document.getElementsByClassName('site-name')[0]) {
					animationTrigger();
				}
			}, true);
		}
	}
})();
// wasTriggered();

function paginatorModify() {
	// 首页/分类页的分页按钮添加pjax功能
	$("nav#page-nav a").attr("data-pjax", "");

	// 插入含有当前文章页面总数的span节点
	var pageNumber = document.getElementsByClassName('page-number').length;
	var separator = "/";
	$("nav#page-nav span.page-number").after("<span class='total'></span>");
	$("nav#page-nav span.page-number").after("<span class='separator'></span>");
	$("nav#page-nav span.separator").text(separator);
	$("nav#page-nav span.total").text(pageNumber);

	var $prev = "<a class='extend prev disabled' rel='prev'></a>";
	var $next = "<a class='extend next disabled' rel='next'></a>";
	if ( $("nav#page-nav a:first-child").attr("rel") !== "prev" ) {
		$("nav#page-nav").prepend($prev);
	}

	if ( $("nav#page-nav a:last-child").attr("rel") !== "next" ) {
		$("nav#page-nav").append($next);
	}

	// 将向前向后按钮文本设置为空 
	$("nav#page-nav .extend").text("");

	$("nav#page-nav .extend").append("<i></i>");
	$("nav#page-nav .extend").append("<i></i>");
}

function afterPjax() {
	// 点击 文章标题 或者 Read More按钮 去掉导航栏高亮
	$("#main section h1 a").click(function() {
		$("#nav-bar").find("li").each(function() {
			$(this).removeClass("active");
		});
	});

	$("#main section a.article-more-link").click(function() {
		$("#nav-bar").find("li").each(function() {
			$(this).removeClass("active");
		});
	});
}

/*
 * 屏幕尺寸小于900px
 */

var smallScreenHeight = window.innerHeight;

// 侧边栏伸缩
function toggleClassStretch() {
	$("header #toggle").toggleClass("stretch2");
	$("header #avatar").toggleClass("stretch2");
	$("header nav#nav-bar").toggleClass("stretch");
	$("#author h2").toggleClass("stretch");
	$("header .social-wrapper").toggleClass("stretch");
	$("header .separator").toggleClass("stretch");
	$("footer.footer-animation1").toggleClass("stretch");
	$("body").toggleClass("overflow-hidden");
}

function toggleSidebar() {
	$("header #toggle").one("mouseenter", function() { // 一次性事件
		$(this).addClass("stretch1");
		$("header nav#nav-bar").addClass("stretch");
		$("header #avatar").addClass("stretch1");
		$("body").addClass("overflow-hidden");		
		animationTrigger();
		paginatorModify();

		$("header .separator").animate({left:"2.5rem"}, 500);

		$("#footer .copyright span.power").remove();
		$("#footer .copyright a:first-child").remove();
		
	});

	$("header #toggle").click(function() {
		toggleClassStretch();
	});

	$("nav#nav-bar ul li a").click(function() {
		toggleClassStretch();
	});
}

if (smallScreen) {
	$("nav#nav-bar").css('height', smallScreenHeight);

	var $sep = "<div class='separator'></div>";
	$("header div.nav-wrapper").append($sep);

	toggleSidebar();
}

// pjax
$(document).pjax('a[data-pjax]', '#container', { fragment: '#container', timeout: 10000 });
$(document).on({
	'pjax:start': function() {
		$("#container").fadeOut(500);
	},

	'pjax:end': function() {
		$("#container").fadeIn(500);
		paginatorModify();
		afterPjax();
	}
});