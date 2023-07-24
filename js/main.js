
$(function(){
	let wrapper=document.querySelector(".wrapper");
	let pageList=wrapper.children;
	let header=wrapper.firstElementChild;
	let gnb=header.querySelector("#gnb");
	let pcM=gnb.querySelector(".menu");
	let pcM1ul=pcM.firstElementChild;
	let pcM1Li=pcM1ul.children;

	let body=document.body;
	let tab=header.querySelector(".tab a");
	let tabMobile=header.querySelector(".tab_mobile");
    let tabInner=tabMobile.firstElementChild.lastElementChild.firstElementChild;
    let tabMenu1depth=tabInner.firstElementChild.children;
	let btnMo=tabMobile.querySelector(".close");
	
    // mainSwiper
    const mainSwiper=new Swiper(".mainSwiper", {
        speed: 2000,
		loop: true,
		effect: "fade",
		fadeEffect: {
			crossFade: true
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
        on: {
            init: function(){
                $("#page1 .keyvisual_area .control_box li").removeClass("active");
                $("#page1 .keyvisual_area .control_box li").eq(this.realIndex).addClass("active");
            },
            slideChange: function(){
                $("#page1 .keyvisual_area .control_box li").removeClass("active");
                $("#page1 .keyvisual_area .control_box li").eq(this.realIndex).addClass("active");
            }
        }
    });

	let isTablet;
    let isMobile;
    let winw;
    let wint=0;
    let winHalf;
	function init(){
		wint=window.innerHeight;
		winw=window.innerWidth;
		winHalf=window.innerHeight*0.25;

		if(winw <= 1220){
            isTablet=true;           
        }
        else{
            isTablet=false;
        }
		if(isTablet){
			for(let i=0; i<tabMenu1depth.length; i++){		
				if(tabMenu1depth[i].classList.contains("on") == true){
					tabMenu1depth[i].classList.remove("on");
					let tab2Depth=tabMenu1depth[i].lastElementChild;
					tab2Depth.removeAttribute("style");	
				}
			}
		}
	}
	init();
	window.addEventListener("resize", init);

	let menuFlag=true;
	
	for(let i=0; i<pcM1Li.length; i++){
		pcM1Li[i].addEventListener("mouseover", function(){				
			header.classList.add("action");
			header.classList.add("white");
		});
		pcM1Li[i].addEventListener("mouseleave", function(){
			header.classList.remove("action");

			if(menuFlag){
				header.classList.remove("white");
			}
		});
	}	
    // scroll  이벤트
	function scrollInteraction(t){		
		if(t > 70) {
			if(menuFlag == true){
				menuFlag=false;
				header.classList.add("white");
			}			
        }
        else {
			if(menuFlag == false){
				menuFlag=true;
				header.classList.remove("white");				
			}			
        }
	}
    const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
			class: {
				in: "active",
				out: "inactive"
			}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.25
				}
			}
		},
		scroll: {
			sustain: 200,
			elememt: window,
			callback: (offset, dir) => { scrollInteraction(offset.y); }
		}
    });
    trigger.add("section[id^=page], #footer");

    // mobile_tab_menu 

	tab.addEventListener("click", function(e){
		e.preventDefault();

		body.classList.add("fixed");
		gsap.fromTo(tabMobile, {display: "block", opacity: 0},{opacity: 1, duration: 0.5});
	});

	btnMo.addEventListener("click", function(e){
		e.preventDefault();

		body.classList.remove("fixed");
		gsap.to(tabMobile, {opacity: 0, duration: 0.5, onComplete: function(){
			tabMobile.removeAttribute("style");
		}});	
	});

    // 아코디언메뉴
    for(let i=0; i<tabMenu1depth.length; i++){

        tabMenu1depth[i].addEventListener("click", function(e){
            e.preventDefault();     
            if(isTablet){
                if(tabMenu1depth[i].classList.contains("on") == false){		
					for(let j=0; j<tabMenu1depth.length; j++){
						if(j == i){
							tabMenu1depth[j].classList.add("on");
							let tab2Depth=tabMenu1depth[j].lastElementChild;
							gsap.fromTo(tab2Depth, {display:"block", height: 0},{height: "auto", duration: 0.5});
						}
						else{
							tabMenu1depth[j].classList.remove("on");
							let tab2Depth=tabMenu1depth[j].lastElementChild;
							gsap.to(tab2Depth, {height:0, duration: 0.5, onComplete: function(){
								tab2Depth.removeAttribute("style");
							}});
						}
					}		
                }
				else{
					tabMenu1depth[i].classList.remove("on");
					let tab2Depth=tabMenu1depth[i].lastElementChild;
					gsap.to(tab2Depth, {height:0, duration: 0.5, onComplete: function(){
						tab2Depth.removeAttribute("style");
					}});
				}	
            }
        });
    }
    // page4_Swiper
    const page4_Swiper=new Swiper(".page4_Swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false
		},

        breakpoints: {         
            800: {
                slidesPerView: 2,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                }
            }
        }
    });
    const FAQSwiper=new Swiper(".FAQSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {         
            800: {
                slidesPerView: 2,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                }
            }
        },
    });

	let conBtn=wrapper.querySelector(".check_circle");
    let ftFamSite=document.querySelector(".footer_familysite");
    let [ftBtn, famUl]=ftFamSite.children;

	conBtn.addEventListener("click", function(e){
		e.preventDefault();
		conBtn.classList.toggle("active");
	});
	
	famUl.style.display="none";
    ftBtn.addEventListener("click", function(e){
        e.preventDefault();

        if(famUl.style.display == "none"){
            gsap.fromTo(famUl, {display:"block", height: 0},{height: "auto", duration: 0.3});
        }
        else{
            gsap.to(famUl, {height: 0, duration: 0.3, onComplete: function(){
				famUl.style.display="none";
			}});
        }
    });

});
