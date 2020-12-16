// navbar expansion
const navbar = document.getElementById("navbar");
const arrowButton = document.getElementById("arrowButton");
const arrowIcon = document.getElementById("arrowIcon");

function togglenav() {
    navbar.classList.toggle("inactive-bar");
    setTimeout(() => { arrowButton.classList.toggle("rotated")}, 200);
}

arrowButton.addEventListener('click', () => togglenav());
window.addEventListener("DOMContentLoaded", togglenav())

// MAIN BUTTONS AND SECTION SWITCH
const exploreButton = document.getElementById("exploreButton");
const exploreSection = document.getElementById("exploreSection");
const myapiButton = document.getElementById("myapiButton");
const myapiSection = document.getElementById("myapiSection");
const aboutButton = document.getElementById("aboutButton");
const aboutSection = document.getElementById("aboutSection");
const discoverButton = document.getElementById("discoverButton");
const discoverSection = document.getElementById("discoverSection");
const seaButton = document.getElementById("seaButton");
const sand = document.getElementById("sand");
const sea = document.getElementById("sea");

const sections = [
    {button: exploreButton,
    section: exploreSection}, 
    {button: myapiButton,
    section: myapiSection},
    {button: aboutButton,
    section: aboutSection},
    {button: discoverButton,
    section: discoverSection}]

function sectionSwitch() {
    sections.forEach(section => {
        section.button.classList.remove("active-item")
        section.section.classList.add("invisible")   
    })
}

sections.forEach(element => {
    element.button.addEventListener("click", () => {
    sectionSwitch();
    element.button.classList.add("active-item")
    element.section.classList.remove("invisible")     
}
)
})

// SEA BUTTON
seaButton.addEventListener('click', () => {
    seaButton.classList.toggle("active-sea");
    sand.classList.toggle("sand");
    sea.classList.toggle("invisible");
    sea.classList.toggle("sea")});

// GET YEAR DINAMICALLY
document.getElementById("currentYear").innerHTML = new Date().getFullYear();

// API'S
const cards = [];
const apiArea = document.getElementById("apiArea");
const layer = document.getElementById("layer");
const modal = document.getElementById("modal");
// const modalClose = document.getElementById("modalClose");
const modalHeader = document.getElementById("modalHeader");
const modalClose2 = document.getElementById("modalClose2");
const modalTitle = document.getElementById("modalTitle");
const modalIcon2 = document.getElementById("modalIcon2");
const modalDescription = document.getElementById("modalDescription");
const modalComplexity = document.getElementById("modalComplexity");
const modalUrl = document.getElementById("modalUrl");
const modalDemonstration = document.getElementById("modalDemonstration");



class APIProject {
    constructor(title, description, icon, documentation, complexity, color, favorite, example){
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.documentation = documentation;
        this.complexity = complexity;
        this.color = color;  
        this.favorite = favorite;
        this.example = example
        APIProject.addInstance(this);
    }
    static addInstance(item) {
        cards.push(item);
    }
    static getInstances() {
        return cards;
    }
    static clearInstances() {
        cards.length = 0;
    }
}

// TWITTER
function twitter() {
    let twitterText  = document.createElement("p")
    twitterText.innerHTML = "You can see a timeline embedded in the middle of the site. Try typing a Twitter account to open it (until ReactJS is added, it will open in another page. Twitter's official account is used by default)"
    twitterText.classList.add("api__text")
    let twitterInput = document.createElement("input")
    twitterInput.classList.add("api__input")
    twitterInput.setAttribute("placeholder", 'Type the account here, text only')
    twitterInput.setAttribute("name", "twitterAccount")
    let twitterButton = document.createElement("button")
    twitterButton.innerHTML = "Search"
    twitterButton.classList.add("api__button")
    twitterButton.setAttribute("type", "submit")

    let twitterActivate = document.createElement("input")
    twitterActivate.value = "twitter"
    twitterActivate.style.display = "none";
    twitterActivate.setAttribute("name", "api")

    let twitterSearch = document.createElement("form")
    twitterSearch.setAttribute("action", "/")
    twitterSearch.setAttribute("method", "post")
    twitterSearch.classList.add("api__search")
    
    twitterSearch.appendChild(twitterInput)
    twitterSearch.appendChild(twitterButton)
    twitterSearch.appendChild(twitterActivate)
    let twitterBlock = document.createElement("div")
    twitterBlock.appendChild(twitterText)
    twitterBlock.appendChild(twitterSearch)
    return twitterBlock;
}

const card1 = new APIProject("Twitter",
    "The Twitter API is a complete tool with different functionalities, from a simple visualization of timelines and tweets embedded into a page, to a more complex view of analytics. Advanced features may require validation via a token that can be obtained in their site",
    ["fab", "fa-twitter"],
    "https://developer.twitter.com/en/docs",
    "Variable", "lightblue", false, twitter());

function openWeather() {
    let openWeatherText = document.createElement("p")
    openWeatherText.innerHTML = "You can see the current weather around the world. Try typing a city to see its weather (until ReactJS is added, it will open in another page)"
    openWeatherText.classList.add("api__text")
    let openWeatherInput = document.createElement("input")
    openWeatherInput.classList.add("api__input")
    openWeatherInput.setAttribute("placeholder", 'Type a city here')
    openWeatherInput.setAttribute("name", "cityName")
    let openWeatherButton = document.createElement("button")
    openWeatherButton.innerHTML = "Search"
    openWeatherButton.classList.add("api__button")
    openWeatherButton.setAttribute("type", "submit")

    let openWeatherActivate = document.createElement("input")
    openWeatherActivate.value = "openWeather"
    openWeatherActivate.style.display = "none";
    openWeatherActivate.setAttribute("name", "api")

    let openWeatherSearch = document.createElement("form")
    openWeatherSearch.setAttribute("action", "/")
    openWeatherSearch.setAttribute("method", "post")
    openWeatherSearch.classList.add("api__search")
    
    openWeatherSearch.appendChild(openWeatherInput)
    openWeatherSearch.appendChild(openWeatherButton)
    openWeatherSearch.appendChild(openWeatherActivate)

    let openWeatherBlock = document.createElement("div")
    openWeatherBlock.appendChild(openWeatherText)
    openWeatherBlock.appendChild(openWeatherSearch)

    return openWeatherBlock;
    }

const card2 = new APIProject(
    "Open Weather",
    "The Open Weather provides a wide range of weather solutions, from free accounts that can access the current weather across different cities, to premium accounts with advanced forecasts and other tools. A free token can be obtained in their website and is required to use the product",
    ["fas", "fa-sun"],
    "https://openweathermap.org/api",
    "Variable", "orange", false, openWeather()
    );


// CARD GENERATION

function showModal(title, icon, description, documentation, color, complexity, example) {
    layer.classList.remove("invisible");

    modal.classList = 'modal'
    modal.classList.add(`modal--${color}`)
    modalIcon2.classList = "";
    modalIcon2.classList.add("modal__icon2");
    icon.forEach(element => {
        modalIcon2.classList.add(element)
    })    
    modalTitle.innerHTML = title + " API";
    modalDescription.innerHTML = description;
    modalUrl.setAttribute("href", documentation);
    modalComplexity.innerHTML = `Complexity of use: ${complexity}`;
    modalDemonstration.innerHTML = `Try it: <br>`
    modalDemonstration.appendChild(example);
    modal.classList.add("modal--active");
}

function closeModal() {
    layer.classList.add("invisible");
    modal.classList.remove("modal--active");
}

// modalClose.addEventListener("click", () => closeModal())
modalClose2.addEventListener("click", () => closeModal())


window.addEventListener('load', () => {
    cards.forEach((project) => {
        let card = document.createElement("div");
        card.classList.add("card", `card--${project.color}`);

        let cardTitle = document.createElement("h2");
        cardTitle.classList.add("card__title");
        let cardTitleText = document.createTextNode(project.title);
        cardTitle.appendChild(cardTitleText);

        let cardIcon = document.createElement("i")
        project.icon.forEach((iconClass) => {
            cardIcon.classList.add(iconClass)
        })
        cardIcon.classList.add("card__icon")
        
        card.appendChild(cardTitle)
        card.appendChild(cardIcon)
        card.addEventListener("click", () => showModal(project.title, project.icon, project.description, project.documentation, project.color, project.complexity, project.example));


        apiArea.appendChild(card);

    })})
