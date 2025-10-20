

document.addEventListener('DOMContentLoaded', ()=> {
    
    animDisplayHomeLoad()

})












function animDisplayHomeLoad() {

    animFromTo(document.querySelector('.top_info'), 3, 
                {top: -90, opacity: 0},
                {top: 0, opacity: 1},
                null) ;


    animFromTo(document.querySelector('.top_navigations'), 1.5, 
                {right: -190, opacity: 0},
                {right: 0, opacity: 1},
                null) ;


    animFromTo(document.querySelectorAll('.content_home_middle h1 span '), 1.5, 
                {left: -220, opacity: 0},
                {left: 0, opacity: 1},
                null) ;


    animFromTo(document.querySelector('.content_home_bottom'), 3, 
                {top: 50, opacity: 0}, 
                {top: 0, opacity: 1},
                null) ;
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


