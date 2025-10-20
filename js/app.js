
import {allProjectData} from './data/project.js';
import {allSkillsData} from './data/about.js';



document.addEventListener('DOMContentLoaded', ()=> {

    animDisplayHomeLoad();


    // --------- SELECT ELEMENT

    const body = document.querySelector('body');

    const container_icon_rect = document.querySelector('.container_icon_rect');
    const title_my_name = document.querySelector('.title_my_name');

    const triggerOpenMenu = document.querySelector('.link_navigation_mobile');
    const triggerCloseMenu = document.querySelector('.close_menu_mobile');
    const menu_navigation = document.querySelector('.top_navigations');

    const homeProgressScroll = document.querySelector('.container_scroll_prog svg circle')

    const link_navigation_projects = document.querySelector('.link_navigation_projects');
    const link_navigation_about = document.querySelector('.link_navigation_about');


    const main_content = document.querySelector('.main_content');
    const main_aside = document.querySelector('.main_aside');

    const top_info = document.querySelector('.top_info');

    

    // --------- EXECUTE FUNCTION
    
    openMenuMobile(triggerOpenMenu, triggerCloseMenu, menu_navigation);


  

 
    // CLICK LOGO HOME & MY NAME
    onClickElement(container_icon_rect, function() {

        goToHome(main_content, main_aside, top_info) ;


    } ) ;

    onClickElement(title_my_name, function() {

        
        goToHome(main_content, main_aside, top_info) ;


    } ) ;



    // CLICK PROJECTS
    onClickElement(link_navigation_projects, function() {

        if (window.innerWidth < 765) {
            hideMenuMobile(menu_navigation) ;
        }


        goToProjects(main_content, main_aside, top_info) ;

    } ) ;



    // CLICK ABOUT
    onClickElement(link_navigation_about, function(){

        if (window.innerWidth < 765) {
            hideMenuMobile(menu_navigation) ;
        }

        
        goToAbout(main_content, main_aside, top_info) ;


 
    })






})







let i = 0;
document.addEventListener("wheel", scrollProgress);















//--------------------------------------------------------- FUNCTION


function openMenuMobile(triggerOpen, triggerClose, menu) {
    
    triggerOpen.addEventListener('click', ()=> {
        menu.classList.add('menuMobileOpen');
    })

    triggerClose.addEventListener('click', ()=> {
        menu.classList.remove('menuMobileOpen');
    })
}

function hideMenuMobile(menu) {
    menu.classList.remove('menuMobileOpen');
}



function scrollProgress(e) {

    let progressScrollSvg = document.querySelector('.progressScroll');

    // Know the direction : UP || DOWN
    let dir = Math.sign(e.deltaY);

    i += (dir * 4);
    i = i < 0 ? 0 : i;
    i = i > 100 ? 100 : i;

    if (i === 100)  {
        goToProjects(document.querySelector('.main_content'), document.querySelector('.main_aside'), document.querySelector('.top_info')) ;
        i =0 ;
    }

    progressScrollSvg.style.strokeDashoffset = 60 - (60 * i) / 100;
}



function allowHorizontalScroll(container) {



        // ------------------------ Scroll Wheel

        container.addEventListener("wheel", (evt) => {
            // evt.preventDefault();
            container.scrollLeft += evt.deltaY;
        });

}



function onClickElement(trigger, funct) {
    trigger.addEventListener('click', funct)
}









// GO TO 
function goToHome(main_content, main_aside, top_info) {

    document.addEventListener("wheel", scrollProgress);


    if (document.querySelector('.projects_content')) {
        removeProjects(document.querySelector('.projects_content'), 
                        document.querySelector('.container_title_projects'),
                        document.querySelector('.slider_arrows_container')) ;
    }

    if (document.querySelector('.about_content')) {
        removeAbout(document.querySelector('.about_content'), 
                    document.querySelector('.container_title_about'),
                    document.querySelector('.coordinate_container')) ;
    }

    setTimeout(() => {
        if (!document.querySelector('.content_home_middle')) {
                displayHome(main_content, main_aside, top_info) ;
    
                requestAnimationFrame( animDisplayHomeTransi )

        }
    }, 1100);

}


function goToProjects(main_content, main_aside, top_info) {

    document.removeEventListener("wheel", scrollProgress);

    if (document.querySelector('.content_home_middle')) {

        removeHome(document.querySelector('.content_home_middle'), 
                    document.querySelector('.content_home_bottom'), 
                    document.querySelector('.container_lorem'),
                    document.querySelector('.container_scroll_prog'),
                    document.querySelector('.coordinate_container') );
    }

    if (document.querySelector('.about_content')) {
        removeAbout(document.querySelector('.about_content'), 
                    document.querySelector('.container_title_about'),
                    document.querySelector('.coordinate_container')) ;
    }

    setTimeout(() => {
        if (!document.querySelector('.projects_content')) {
                displayProjects(main_content, main_aside, top_info);
    
                
                sliderProject(document.querySelectorAll('.container_one_project'),
                                document.querySelector('.arrow_previous'),
                                document.querySelector('.arrow_next'))
    
                requestAnimationFrame( animDisplayProjectTransi ) ;

        }
        
    }, 1100);

}


function goToAbout(main_content, main_aside, top_info) {

    document.removeEventListener("wheel", scrollProgress);

    if (document.querySelector('.content_home_middle')) {

        removeHome(document.querySelector('.content_home_middle'), 
                    document.querySelector('.content_home_bottom'), 
                    document.querySelector('.container_lorem'),
                    document.querySelector('.container_scroll_prog'),
                    document.querySelector('.coordinate_container') );
    }

    if (document.querySelector('.projects_content')) {
        removeProjects(document.querySelector('.projects_content'), 
                        document.querySelector('.container_title_projects'),
                        document.querySelector('.slider_arrows_container')) ;
    }

    setTimeout(() => {
        if (!document.querySelector('.about_content')) {

                displayAbout(main_content, main_aside, top_info);
    
                requestAnimationFrame( animDisplayAboutTransi ) ;
    
    
                // SCROLL HORIZONTAL
                setTimeout(() => {
    
                    let about_content_top = document.querySelector('.about_content_top') ;
                    allowHorizontalScroll(about_content_top) ;
        
        
                    let allAboutSlide = document.querySelectorAll('.about_slide') ;
        
                    let rectContainer = about_content_top.getBoundingClientRect() ;
        
        
                    about_content_top.addEventListener('wheel', ()=> {
        
                        allAboutSlide.forEach(aAboutSlide => {
                            // console.log((aAboutSlide.getBoundingClientRect() ));
            
                            let rectSlide = aAboutSlide.getBoundingClientRect() ;
                            // console.log(rectSlide.x);
        
                            if (rectSlide.x < (rectContainer.x - 200) ) {
                                aAboutSlide.classList.remove('aboutSlideActive') ;
                            }
                            else if (rectSlide.x > rectContainer.x + rectContainer.width - 350) {
                                aAboutSlide.classList.remove('aboutSlideActive') ;
                            }
                            else {
                                aAboutSlide.classList.add('aboutSlideActive') ;
                            }
        
        
                        })
                    })
        
        
                }, 2000);
                
        }
        
    }, 1100);

}


// REMOVE
function removeHome(content_home_middle, content_home_bottom, container_lorem, container_scroll_prog, coordinate_container) {
    // console.log(main_content.children[1]);


    setTimeout(() => {
        content_home_middle.remove();
        content_home_bottom.remove();
        container_lorem.remove();
        container_scroll_prog.remove();
        coordinate_container.remove()
    }, 1000);


    
    animFromTo(content_home_middle, 1, 
        {left: 0, opacity: 1},
        {left: -90, opacity: 0},
        null) ;

    animFromTo(content_home_bottom, 1, 
        {top: 0, opacity: 1},
        {top: 90, opacity: 0},
        null) ;
   
    animFromTo(container_lorem, 1, 
        {left: 0, opacity: 1},
        {left: -90, opacity: 0},
        null) ;

    animFromTo(container_scroll_prog, 1, 
        {left: 0, opacity: 1},
        {left: -90, opacity: 0},
        null) ;
    
    animFromTo(coordinate_container, 1, 
        {right: 0, opacity: 1},
        {right: -90, opacity: 0},
        null) ;

}


function removeProjects(projects_content, container_title_projects, slider_arrows_container){
    setTimeout(() => {
        projects_content.remove() ;
        container_title_projects.remove() ;
        slider_arrows_container.remove() ;
    }, 1000);



    animFromTo(projects_content, 1, 
        {left: 0, opacity: 1},
        {left: 90, opacity: 0},
        null) ;


    animFromTo(container_title_projects, 1, 
        {bottom: 0, opacity: 1},
        {bottom: -90, opacity: 0},
        null) ;

    animFromTo(slider_arrows_container, 1, 
        {left: 0, opacity: 1},
        {left: -40, opacity: 0},
        null) ;
}

function removeAbout(about_content, about_aside_title, coordinate_container) {
    setTimeout(() => {
        about_content.remove() ;
        about_aside_title.remove() ;
        coordinate_container.remove();
    }, 1000);



    animFromTo(about_content, 1, 
        {left: 0, opacity: 1},
        {left: 90, opacity: 0},
        null) ;


    animFromTo(about_aside_title, 1, 
        {bottom: 0, opacity: 1},
        {bottom: -90, opacity: 0},
        null) ;

    animFromTo(coordinate_container, 1, 
        {right: 0, opacity: 1},
        {right: -90, opacity: 0},
        null) ;


}


// DISPLAY
function displayHome(main_content, main_aside, top_info) {

    let content_home_middle  = create('div', main_content, null, 'content_home_middle' );
    let h1  = create('h1', content_home_middle );
    let title_first_word  = create('span', h1, 'WEB', 'title_first_word' );
    let title_second_word  = create('span', h1, 'DEVELOPER', 'title_second_word' );


    let content_home_bottom  = create('div', main_content, null, 'content_home_bottom' );
    content_home_bottom.classList.add('padding_bottom_viewport') ;
    let bottom_info  = create('div', content_home_bottom, null, 'bottom_info' );
    let h2  = create('h2', bottom_info, 'IT STUDENT' );
    let bottom_icon_scroll  = create('div', content_home_bottom, null, 'bottom_icon_scroll' );
    let img  = create('img', bottom_icon_scroll );
    img.src = "img/icon/icon-scroll.png" ;

    let container_lorem = create('div', main_aside, null, 'container_lorem' );
    let p = create('div', container_lorem );

    p.innerHTML = `
        <p> 
            <span class="quoteMark">"</span> 
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            <span class="quoteMark">"</span>
        </p>

    ` ;

    let container_scroll_prog = create('div', main_aside, null, 'container_scroll_prog' );

    container_scroll_prog.innerHTML = `
        <svg>
            <circle cx="15" cy="15" r="9" fill-opacity="0" class="progressScroll"></circle>
        </svg>
    `;


    let coordinate_container = create('div', top_info, null, 'coordinate_container');

    coordinate_container.innerHTML = `
        <p>45° 53' 57.289" N 6° 7' 45.782" E</p>
        <p> <span class="bold">Annecy, </span> FRANCE </p>
    ` ;




    
}


function displayProjects(main_content, main_aside, top_info) {
    let projects_content  = create('div', main_content, null, 'projects_content' ) ;

    displayProjectContent(projects_content, allProjectData) ;



    let container_title_projects = create('div', main_aside, null, 'container_title_projects' );
    create('h1', container_title_projects, "PROJECT", 'projects_aside_title');
    let container_project_number = create('div', container_title_projects, null, "projects_aside_title_nb" );
    let project_number_first = create('span', container_project_number, "0", "project_number_first" );
    let project_number_second = create('span', container_project_number, "1", "project_number_second" );


    let slider_arrows_container = create('div', top_info, null, 'slider_arrows_container');
    
    slider_arrows_container.innerHTML = `
        <span class="arrow_previous"> <i class="fas fa-chevron-left arrow_slider "></i> </span>
        <span class="arrow_next"> <i class="fas fa-chevron-right arrow_slider "></i> </span>
    ` ;



}


function displayProjectContent(projects_content, allProjectData ) {

    const classContainerProject = ['container_first_project', 'container_second_project', 'container_third_project'] ;

    let i = 0 ;

    allProjectData.forEach(aProjectData => {


        // CREATE CONTAINER ONE PROJECT
        let a_project = create('div', projects_content, null, 'container_one_project' );
        a_project.classList.add(classContainerProject[i]) ;

        i == 0 ?  a_project.classList.add('slide_active') : "" ; 
       
        a_project.setAttribute('data-slide', i + 1) ;
        


        // CREATE ELEMENT IN CONTAINER 
            // TOP
        let container_project_top = create('div', a_project, null, 'container_project_top');

                // IMG
        let container_img_project = create('div', container_project_top, null, 'container_img_project') ;
        let img_project = create('img', container_img_project, null, 'img_project') ;
        img_project.src = 'img/projects/' +  aProjectData['contentTop']['nameImg'];
                
                // INFO
        let container_top_info_project = create('div', container_project_top, null, 'container_top_info_project' ) ;
        let top_info_title_project = create('h2', container_top_info_project, aProjectData['contentTop']['topInfo']['title'], 'top_info_title_project' ) ;
        if (aProjectData['contentTop']['topInfo']['subTitle']) {
            create('span', top_info_title_project, aProjectData['contentTop']['topInfo']['subTitle'], 'top_info_subTitle_project' )
        }
        let top_info_type_project = create('p', container_top_info_project, aProjectData['contentTop']['topInfo']['type'], 'top_info_type_project') ;
        let top_info_txt_project = create('p', container_top_info_project, aProjectData['contentTop']['topInfo']['txt'], 'top_info_txt_project') ;
    
        let top_info_link_project = create('a', container_top_info_project, null, 'top_info_link_project' ) ;
        top_info_link_project.innerHTML = 'Visit WebSite <i class="fas fa-arrow-right"></i> ' ;
        top_info_link_project.href = aProjectData['contentTop']['topInfo']['urlLink'] ;
        top_info_link_project.target = '_blank' ;
    
    
            // BOTTOM
        let container_bottom_project = create('div', a_project, null,  'container_bottom_project') ;

                // INFO
        let container_bottom_info_project = create('div', container_bottom_project, null, 'container_bottom_info_project') ;
        let bottom_info_title_project = create('h3', container_bottom_info_project, 'Technical', 'bottom_info_title_project') ;
        let bottom_info_txt_project = create('p', container_bottom_info_project, aProjectData['contentBottom']['bottomInfo']['txt'], 'bottom_info_txt_project') ;
        
                // TECHNO
        let container_bottom_techno_project = create('div', container_bottom_project, null, 'container_bottom_techno_project' ) ;
        let container_techno_content_project = create('div', container_bottom_techno_project, null, 'container_techno_content_project') ;

        let container_techno_all_bar_project = create('div', container_techno_content_project, null, 'container_techno_all_bar_project') ;
        let container_techno_all_name_project = create('div', container_techno_content_project, null, 'container_techno_all_name_project') ;

        for (const [nameTechno, objectTechno] of Object.entries(aProjectData['contentBottom']['allTechno'])) {

                    // BAR 
            let bar_project = create('div', container_techno_all_bar_project, null, 'container_bar_project') ;
            bar_project.style.width =  objectTechno['use'] + "%" ;
            bar_project.style.backgroundColor = objectTechno['color'];


                    // NAME
            let container_techno_name_project = create('div', container_techno_all_name_project, null, 'container_techno_name_project');
            let circle_techno_project = create('div', container_techno_name_project, null, 'circle_techno_project') ;
            circle_techno_project.style.backgroundColor = objectTechno['color'] ;
            create('p', container_techno_name_project, nameTechno, 'name_techno_project') ;

          }

        
        i++ ;


        // console.log(aProjectData['contentTop']['nameImg']);
    })

    
}


function displayAbout(main_content, main_aside, top_info) {
    let about_content  = create('div', main_content, null, 'about_content' ) ;


    // ---------------- TOP
//#region TOP
    let about_content_top  = create('div', about_content, null, 'about_content_top' ) ;


        // ---------------- SLIDE 1
//#region SLIDER 1
    let about_slide1 = create('div', about_content_top, null, 'about_slide') ;
    about_slide1.classList.add('slide_me') ;
    about_slide1.classList.add('aboutSlideActive') ;


    create('h1', about_slide1, 'Hi, I\'m Théo', 'slide1_big_title') ;

    let container_txt_img_slide1 =  create('div', about_slide1, null, 'container_txt_img_slide1') ;

    let txt_slide1 = create('p', container_txt_img_slide1, null, 'txt_slide1') ;
    txt_slide1.innerHTML = `
        Currently in my second year of computer science, I have acquired skills in all areas of computer development. 
        Adept of web development, I like to keep up with new technologies by doing personal projects. Passionate about 
        UX/UI Design, I study it in parallel to my studies in order to improve user comfort. Team worker at heart, 
        I have no problem working alone. I would like to use my skills to help a company to create new development 
        experiences.
    ` ;

    // let container_img_slide1 = create('div', container_txt_img_slide1, null, 'container_img_slide1')

    let img_slide1 = create('img', container_txt_img_slide1, null, 'img_slide1') ;
    img_slide1.src = "img/about/me.jpg" ;

//#endregion SLIDER 1


        // ---------------- SLIDE 2
//#region SLIDER 2
    let about_slide2 = create('div', about_content_top, null, 'about_slide') ;
    about_slide2.classList.add('slide_diploma') ;


    create('h2', about_slide2, 'EDUCATION & QUALIFICATION', 'slide_title') ;

    let container_all_education = create('div', about_slide2, null, 'container_all_education') ;

    let container_education1 = create('div', container_all_education, null, 'container_education') ;
    
    create('p', container_education1, '2022 - Today', 'education_date') ;

    let container_education_info1 = create('div', container_education1, null,  'container_education_info');
    create('p', container_education_info1, 'IT Engineer', 'education_diploma') ;
    create('p', container_education_info1, 'Polytech - University of Savoie - Annecy, France', 'education_location') ;
    create('p', container_education_info1, 'University diploma in computer engineering specialized in BIG DATA. (3 years)', 'education_descr') ;


    let container_education2 = create('div', container_all_education, null, 'container_education') ;
    
    create('p', container_education2, '2020 - 2022', 'education_date') ;

    let container_education_info2 = create('div', container_education2, null,  'container_education_info');
    create('p', container_education_info2, 'DUT INFO', 'education_diploma') ;
    create('p', container_education_info2, 'IUT - University of Savoie - Annecy, France', 'education_location') ;
    create('p', container_education_info2, 'University diploma of technology specialized in computer science. (2 years)', 'education_descr') ;




    // let container_education3 = create('div', container_all_education, null, 'container_education') ;
    
    // create('p', container_education3, '2017 - 2020', 'education_date') ;

    // let container_education_info3 = create('div', container_education2, null,  'container_education_info');
    // create('p', container_education_info3, 'Baccalaureat S SVT/INF', 'education_diploma') ;
    // create('p', container_education_info3, 'High School - Montceau-les-Mines, France', 'education_location') ;
    // create('p', container_education_info3, 'High school diploma in science and computer science ', 'education_descr') ;

//#endregion SLIDER 2


        // ---------------- SLIDE 3


//#region SLIDER 3
    let about_slide3 = create('div', about_content_top, null, 'about_slide') ;
    about_slide3.classList.add('slide_skills') ;


    create('h2', about_slide3, 'MY SKILLS', 'slide_title') ;



    let container_skills_content = create('div', about_slide3, null, 'container_skills_content') ;



    displayAboutSkillsContent (container_skills_content, allSkillsData) ;


//#endregion SLIDER 3

        // ---------------- SLIDE 4

//#region SLIDER 4
    let about_slide4 = create('div', about_content_top, null, 'about_slide') ;
    about_slide4.classList.add('slide_skills_again') ;




    let title_skills_again = create('h2', about_slide4, 'MY SKILLS', 'slide_title') ;
    create('span', title_skills_again, '   ... Again', "title_skills_again_second_part")


    let container_skills_again_content = create('div', about_slide4, null, 'container_skills_content') ;



    let container_skill_languages = create('div', container_skills_again_content, null, 'container_skill') ;
    create('h3', container_skill_languages, 'LANGUAGES', 'slide_sub_title') ;

    let one_language_french = create('div', container_skill_languages, null, 'one_skill') ;
    create('p', one_language_french, 'FRENCH', 'one_skill_type' ) ;
    let container_bar_french = create('div', one_language_french, null, 'container_bar') ;
    let bar_fill_french = create('div', container_bar_french, null, 'bar_fill') ;
    bar_fill_french.classList.add('bar_fill_french') ;

    let one_language_english = create('div', container_skill_languages, null, 'one_skill') ;
    create('p', one_language_english, 'ENGLISH (B2)', 'one_skill_type' ) ;
    let container_bar_english = create('div', one_language_english, null, 'container_bar') ;
    let bar_fill_english = create('div', container_bar_english, null, 'bar_fill') ;
    bar_fill_english.classList.add('bar_fill_english') ;



    let container_skill_personal = create('div', container_skills_again_content, null, 'container_skill') ;
    create('h3', container_skill_personal, 'PERSONAL', 'slide_sub_title') ;

    let one_personal1 = create('div', container_skill_personal, null, 'one_skill') ;
    one_personal1.classList.add('one_skill_personnal') ;
    let one_personal1_txt = create('p', one_personal1, '- I am serious, rigorous, organized and autonomous ', 'one_skill_type' ) ;
    one_personal1_txt.classList.add('one_personal_txt') ;

    let one_personal2 = create('div', container_skill_personal, null, 'one_skill') ;
    one_personal2.classList.add('one_skill_personnal') ;
    let one_personal2_txt = create('p', one_personal2, '- As a good listener, I easily understand the needs of each person ', 'one_skill_type' ) ;
    one_personal2_txt.classList.add('one_personal_txt') ;
    



//#endregion SLIDER 4




        // ---------------- SLIDE 5
  
//#region SLIDER 5
    let about_slide5 = create('div', about_content_top, null, 'about_slide') ;
    about_slide5.classList.add('slide_references') ;

    
    create('h2', about_slide5, 'REFERENCES', 'slide_title') ;


    let container_all_references = create('div', about_slide5, null, 'container_all_references') ;



    let container_reference1 = create('div', container_all_references, null, 'container_reference') ;
    
    create('p', container_reference1, 'Luc Damas', 'reference_name') ;

    let container_reference_info1 = create('div', container_reference1, null,  'container_reference_info');
    create('p', container_reference_info1, 'Associate Professor', 'reference_type') ;
    create('p', container_reference_info1, 'IUT Annecy', 'reference_location') ;
    create('p', container_reference_info1, 'luc.damas@univ-smb.fr', 'reference_mail') ;


    let container_reference2 = create('div', container_all_references, null, 'container_reference') ;
    
    create('p', container_reference2, 'Vincent Couturier', 'reference_name') ;

    let container_reference_info2 = create('div', container_reference2, null,  'container_reference_info');
    create('p', container_reference_info2, 'Associate Professor', 'reference_type') ;
    create('p', container_reference_info2, 'IUT Annecy', 'reference_location') ;
    create('p', container_reference_info2, 'vincent.couturier@univ-smb.fr', 'reference_mail') ;




    let link_cv = create('a', about_slide5, 'MY CV', 'link_cv') ;
    link_cv.href = "img/CV_PLEBANI_THEO.pdf" ;
    link_cv.download = "" ;


//#endregion SLIDER 5




//#endregion TOP






    // ---------------- BOTTOM

//#region BOTTOM
    let about_content_bottom  = create('div', about_content, null, 'about_content_bottom' ) ;

        // ---------------- CONTACT
    let about_contact  = create('div', about_content_bottom, null, 'about_contact' ) ;

    let contact_email = create('p', about_contact, null, 'contact_email') ;
    contact_email.classList.add('contact_element') ;
    contact_email.innerHTML = '<i class="fas fa-envelope"></i> theoplebani2002@icloud.com ' ;

    let contact_phone = create('p', about_contact, null, 'contact_phone') ;
    contact_phone.classList.add('contact_element') ;
    contact_phone.innerHTML = '<i class="fas fa-phone-square"></i> +336 49 01 25 20' ;

    let contact_linkedin_link = create('a', about_contact, null, 'contact_linkedin_link') ;
    contact_linkedin_link.classList.add('contact_element') ;
    contact_linkedin_link.innerHTML = '<i class="fab fa-linkedin"></i> Theo Plebani' ;
    contact_linkedin_link.href = "https://www.linkedin.com/in/theo-plebani-957a821b8/?originalSubdomain=fr" ;
    contact_linkedin_link.target = "_blank" ;

    let contact_git_link = create('a', about_contact, null, 'contact_git_linkcontact_git_link') ;
    contact_git_link.classList.add('contact_element') ;
    contact_git_link.innerHTML = '<i class="fab fa-github"></i> Trikzy7' ;
    contact_git_link.href = "https://github.com/Trikzy7?tab=repositories" ;
    contact_git_link.target = "_blank" ;

        // ---------------- SCROLL TXT
    let txt_scroll_right = create('p', about_content_bottom, null, "txt_scroll_right") ;
    txt_scroll_right.innerHTML = ' SCROLL <i class="fas fa-arrow-right"></i> ' ;


//#endregion BOTTOM



    // ---------------- ASIDE
    let container_title_about = create('div', main_aside, null, 'container_title_about' );
    let about_aside_title = create('h1', container_title_about, "ABOUT", 'about_aside_title');
    create('span', about_aside_title, 'ME', 'about_aside_title_me' ) ;


    // ---------------- COORDINATE
    let coordinate_container = create('div', top_info, null, 'coordinate_container');

    coordinate_container.innerHTML = `
        <p>45° 53' 57.289" N 6° 7' 45.782" E</p>
        <p> <span class="bold">Annecy, </span> FRANCE </p>
    ` ;
}



function displayAboutSkillsContent (container_skills_content, allSkillsData) {

    allSkillsData.forEach(aSkillContainer => {

        let container_type = create('div', container_skills_content, null, 'container_skill') ;
        create('h3', container_type, aSkillContainer['title'], 'slide_sub_title') ;
    

        for (const [nameTechno, useTechno] of Object.entries(aSkillContainer['techno'])) {


            let one_skill = create('div', container_type, null, 'one_skill') ;
            create('p', one_skill, nameTechno, 'one_skill_type' ) ;
            let container_bar = create('div', one_skill, null, 'container_bar') ;
            let bar_fill = create('div', container_bar, null, 'bar_fill') ;

            bar_fill.style.width = useTechno + "%" ;
        }

    })

}




// ANIM TRANSITION
function animDisplayHomeTransi() {
        
    animFromTo(document.querySelectorAll('.content_home_middle'), 1.5, 
                {left: -120, opacity: 0},
                {left: 0, opacity: 1},
                null) ;

    animFromTo(document.querySelector('.content_home_bottom'), 3, 
                {top: 50, opacity: 0}, 
                {top: 0, opacity: 1},
                null) ;
        
    animFromTo(document.querySelector('.container_lorem'), 1.5, 
                {left: -90, opacity: 0},
                {left: 0, opacity: 1},
                null) ;

    animFromTo(document.querySelector('.coordinate_container'), 1.5, 
                {right: -90, opacity: 0},
                {right: 0, opacity: 1},
                null) ;



    // console.log("ANIM HOME DISPLAY");
}


function animDisplayProjectTransi() {

    animFromTo(document.querySelectorAll('.projects_content'), 1, 
        {left: -90, opacity: 0},
        {left: 0, opacity: 1},
        null) ;

    animFromTo(document.querySelectorAll('.container_title_projects'), 1, 
        {bottom: -90, opacity: 0},
        {bottom: 0, opacity: 1},
        null) ;

    animFromTo(document.querySelectorAll('.arrow_previous'), 1, 
        {left: -15, opacity: 0},
        {left: 0, opacity: 1},
        null) ;

    animFromTo(document.querySelectorAll('.arrow_next'), 1, 
        {right: -15, opacity: 0},
        {right: 0, opacity: 1},
        null) ;
}



function animDisplaySlideProjectTransi() {

    animFromTo(document.querySelector('.slide_active .container_img_project'), 2.1, 
    {left: -90, opacity: 0},
    {left: 0, opacity: 1},
    null) ;

    animFromTo(document.querySelector('.slide_active .container_top_info_project'), 2.1, 
    {top: -90, opacity: 0},
    {top: 0, opacity: 1},
    null) ;


    animFromTo(document.querySelector('.slide_active .container_bottom_info_project'), 2.1, 
    {bottom: -90, opacity: 0},
    {bottom: 0, opacity: 1},
    null) ;

    animFromTo(document.querySelector('.slide_active .container_bottom_techno_project'), 2.1, 
    {right: -90, opacity: 0},
    {right: 0, opacity: 1},
    null) ;

}


function animDisplayAboutTransi() {

    animFromTo(document.querySelectorAll('.about_content'), 1, 
                {left: -90, opacity: 0},
                {left: 0, opacity: 1},
                null) ;
        
    animFromTo(document.querySelector('.coordinate_container'), 1.5, 
                {right: -90, opacity: 0},
                {right: 0, opacity: 1},
                null) ;

    animFromTo(document.querySelector('.container_title_about'), 1.5, 
                {bottom: -90, opacity: 0},
                {bottom: 0, opacity: 1},
                null) ;

}












// SLIDER PROJECTS
function sliderProject(container_one_project, prev_arrow, next_arrow) {

    let nb_slide_project = container_one_project.length ;

    var count = 0;

    animDisplaySlideProjectTransi();


    prev_arrow.addEventListener('click', ()=> {
        count = prevSlide(container_one_project, nb_slide_project, count);
        // console.log(count);
        changeNbSlideTitle() ;
        animDisplaySlideProjectTransi();

        
    } )

    next_arrow.addEventListener('click', ()=> {
        count = nextSlide(container_one_project, nb_slide_project, count);
        // console.log(count);
        changeNbSlideTitle();
        animDisplaySlideProjectTransi();

    } )

    
}


function prevSlide(container_one_project, nb_slide_project, count) {
    container_one_project[count].classList.remove('slide_active') ;

    if (count > 0  ) {
        count--;
    } else {
        count = nb_slide_project - 1 ;
    }
    // console.log(count);
    container_one_project[count].classList.add('slide_active') ;

    return count ;
}



function nextSlide(container_one_project, nb_slide_project, count) {
    container_one_project[count].classList.remove('slide_active') ;

    if (count < nb_slide_project - 1  ) {
        count++;
    } else {
        count = 0 ;
    }
    // console.log(count);
    container_one_project[count].classList.add('slide_active') ;

    return count ;
}



function changeNbSlideTitle() {

    let project_number_second = document.querySelector('.project_number_second');
    let slide_active = document.querySelector('.slide_active');


    animFromTo(project_number_second, 0.7, 
        {top: 0, opacity: 1},
        {top: -50, opacity: 0},
        null) ;


    

    setTimeout(() => {    
        project_number_second.innerHTML = slide_active.getAttribute('data-slide');
        // project_number_second.style.top = 0 + "px" ;
        animFromTo(project_number_second, 0.7, 
            {top: -50, opacity: 0},
            {top: 0, opacity: 1},
            null) ;
    }, 700);


}







//--------------------------------------------------------- UTILITIES

function create(tag, parent, content=null, classs=null, id=null) {

	let element = document.createElement(tag)
	
	if (content)
		element.appendChild(document.createTextNode(content))
	if (id)
		element.id = id
	if (classs)
		element.classList.add(classs)

	parent.appendChild(element)

	return element
}





function animFromTo(element, duration, ObjFrom, ObjTo, delay) {

    const posProperty = ["top", "left", "right", "bottom"] ;

   

    if(isNodeList(element)) {

        element.forEach(aElement => {

            // OBJ From
            for (const [key, value] of Object.entries(ObjFrom)) {

                if (posProperty.includes(key)) {
                    aElement.style[key] = value + "px";
                
                }
                else {
                    aElement.style[key] = value ;
                }

            }


            
            // OBJ To
            setTimeout(() => {
                
                for (const [key, value] of Object.entries(ObjTo)) {

                    if (posProperty.includes(key)) {
                        aElement.style[key] = value + "px";
                    } 
                    else {
                        aElement.style[key] = value ;
                    }
                }

                aElement.style.transition = duration + "s ease";
                // aElement.style.transitionDelay = cptDelay * delay + "s";

            }, 0);

        });
    }
    else {

        // OBJ From
        for (const [key, value] of Object.entries(ObjFrom)) {

            if (posProperty.includes(key)) {
                element.style[key] = value + "px";
   
            } 
            else {
                element.style[key] = value ;
    
            }
        }



        // OBJ To
        setTimeout(() => {
            for (const [key, value] of Object.entries(ObjTo)) {

                if (posProperty.includes(key)) {
                    element.style[key] = value + "px";
       
                
                } 
                else {
                    element.style[key] = value ;
                }
            }

            element.style.transition = duration + "s ease";

        }, 0);
    }
}


function isNodeList(element) {
    return NodeList.prototype.isPrototypeOf(element) ? true :  false ;
}


