var mainText = [
    {
        heading: "Discover innovative ways to decorate",
        text: "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
        img: "images/desktop-image-hero-1.jpg"
    },

    {
        heading: "Manufactured with the best materials",
        text: "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
        img: "images/desktop-image-hero-2.jpg"
    },

    {
        heading: "We are available all across the globe",
        text: "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
        img: "images/desktop-image-hero-3.jpg"
    }
]

var pointer = null


function addElement(element, innerContent, parentElement, id = null,  classList = null, beforeElement = null ){

    const elm = document.createElement(element)    // creating the element which is to be added
    const elmText = document.createTextNode(innerContent)  // creating the content which will be inside the element
    elm.appendChild(elmText) // inserting the content inside the element

    if (id){
        elm.id = id;
    }

    if (classList) {
        elm.classList.add(classList)       // adding classes if any
    }

    if (beforeElement){ // checking if there an element to add before, then creating its node
        beforeElement = document.querySelector(beforeElement)
    }

    document.querySelector(parentElement).insertBefore(elm, beforeElement) // finally pushing elem into the html web

    return elmText // returning the inner content variable which can be change using it.

    
}



// this variables hold the inner text of the respective element, if changed only the innertext/content of the element will change
// const heading = addElement("h1", mainText[0].heading, ".main-text", "main-heading", "main-heading", "#shop-now-btn")
// const headingDescription = addElement("p", mainText[0].text, ".main-text", "heading-description", "heading-description", "#shop-now-btn")

addElement("h1", mainText[0].heading, ".main-text", "main-heading", "main-heading", "#shop-now-btn")
addElement("p", mainText[0].text, ".main-text", "heading-description", "heading-description", "#shop-now-btn")

const headingElm = document.getElementById("main-heading");
const headingDescriptionElm = document.getElementById("heading-description");
const heroImg = document.getElementById("hero-img")
pointer = 0


const slideButtons = document.querySelectorAll(".slider-btn-item")

for (let i = 0; i < slideButtons.length; i++) {
   
        
    slideButtons[i].addEventListener("click", function() {
        const buttonClicked = this.id;

        if (buttonClicked === "next"){

            // case where pointer has gone out of bounds of maintext array, resetting it to 0
            if (pointer === mainText.length - 1){
                pointer = 0
            } else {
                pointer++
            }

        } else if (buttonClicked === "previous"){

            // case where pointer has is already at starting(0) index, assign it last element of maintext
            if (pointer === 0){
                pointer = mainText.length - 1
            } else {
                pointer--;
            }
        }

        // changing values
        headingElm.innerHTML = mainText[pointer].heading
        headingDescriptionElm.innerHTML = mainText[pointer].text
        heroImg.style.backgroundImage = `url(${mainText[pointer].img})`

        headingElm.classList.add("fade");
        headingDescriptionElm.classList.add("fade");
        heroImg.classList.add("bg-img-fade")    

        setTimeout(() => {
            headingElm.classList.remove("fade")
            headingDescriptionElm.classList.remove("fade")
            heroImg.classList.remove("bg-img-fade")  
        }, 300);

    })

}