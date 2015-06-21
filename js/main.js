/*
 * 触发动画函数，以显示文章
 */
function animationTrigger() {
	$("#avatar a:nth-child(2)").remove();
	$("#avatar").addClass("avatar-animation");
	$("#author h1").remove();
	$("#author h2").addClass("subtitle-animation");
	$("#author h2").hide().delay(800).fadeIn(800);

	$("div.social-wrapper").addClass("social-animation").hide();
	$("div.social-wrapper").delay(800).fadeIn(800);

	$("#container").fadeIn(1000);

	var footer = document.getElementById("footer");
	var copyright = document.createElement("span");
	var c_font = document.createElement("i");

	if (!c_font.getAttribute("class")) {
		c_font.setAttribute("class", "fa fa-copyright");
	}

	copyright.appendChild(c_font);
	footer.appendChild(copyright);

	$("footer").addClass("footer-animation1");
	$("footer #footer span").click(function() {
		$("footer").toggleClass("footer-animation2");
	});

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
	$("#all-articles i").mouseenter(function() {
		animationTrigger();
	});

	// 导航栏被点击时，改变导航栏颜色
	$("nav#nav-bar ul li a").click(function() {
		$(this).css("color", "#f77e75");

		// 判断被点击元素的兄弟元素是否被点击过（即颜色是否改变）
		var prev = $(this).parent().prev();
		var next = $(this).parent().next();
		for (var i=0, len=$("ul li a").length - 1; i < len; i++) {
			// jquery css()方法获取的是rgb格式的颜色
			if (prev.children("a").css("color") == "rgb(247, 126, 117)") {
				prev.children("a").css("color", "#6D727A");
			} else {
				prev = prev.prev();
			}
			
			if (next.children("a").css("color") == "rgb(247, 126, 117)") {
				next.children("a").css("color", "#6D727A");
			} else {
				next = next.next();
			}
		}
	});


	
});

/*
 * 点击导航栏时如果未触发动画，则先触发动画
 */
function wasTriggered() {
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
}
wasTriggered();

function antiHighlight() {
	$("#nav-bar").find('a').each(function() {
		$(this).css("color", "#6D727A");
	});
}

$("#main section a h1").click(function() {
	antiHighlight();
});

$(document).pjax('a[data-pjax]', '#container', { fragment: '#container', timeout: 10000 });