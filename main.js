// CONST AND VAR DECLARATIONS

const EVENT_CLICKABLE_CLASS_NAME = "g3dbUc smECzc jKgTF QGRmIf";
const EVENT_CONTAINER_CSS_SELECTORS = "span.JtukPc";
const CORS_ANYWHERE_HEROKU_URI = "https://cors-anywhere.herokuapp.com/";
const MAL_USERNAME = "TheGreatFern";
const MAL_API_URI = "api.myanimelist.net:443/v2/users/" + MAL_USERNAME;
const EVENT_CONTAINER_HEIGHT = 468;
const EVENT_DOM_TREE = ".BXL82c";
// Fix for now to use limit = 1000 and bypass paging, may need more elegant solution later
var animeRequestUriWatching = CORS_ANYWHERE_HEROKU_URI + MAL_API_URI + "/animelist?status=watching&limit=1000";
var animeRequestUriPlanToWatch = CORS_ANYWHERE_HEROKU_URI + MAL_API_URI + "/animelist?status=plan_to_watch&limit=1000";

// CONST AND VAR DECLARATIONS



/**
 * Calls MAL's API and returns formatted JSON objects
 * @param {string} animeRequestUri URI for MAL API call
 */
async function getAnimeData(animeRequestUri) {
    console.log("Anime data fetched!")
    let response = await fetch(animeRequestUri, {
        method: 'get',
        headers: {
            'X-MAL-CLIENT-ID': 'abd8bad30b44d089cba3ea0b9c99e60f'
        },
    });
    let userAnimeList = await response.json();
    let userAnimeListArr = Array.from(userAnimeList.data);
    userAnimeListArr.forEach(anime => {
        // Store key-value pairs in local storage
        localStorage.setItem(anime.node.title, anime.node.main_picture.large)
    });
}


/**
 * Takes events on the page and injects the image flair
 * @param {string} animeRequestKey Anime name
 * @param {Element} eventContainer Event to inject image flair into
 */
async function imageInjector(animeRequestKey, eventContainer) {
    // Scale image down to event container size
    // var eventContainerHeight = eventContainer.offsetHeight;
    console.log(animeRequestKey);
    var animeImage = localStorage.getItem(animeRequestKey);
    console.log(animeImage);
    let imageInjection = '<div style="display: flex; float: left">'
                    + '<img style="height: ' + EVENT_CONTAINER_HEIGHT + 'px; object-fit: cover" src="' + animeImage + '">'
                    + '</div>'; 
    eventContainer.insertAdjacentHTML('afterbegin', imageInjection);
}


/**
 * Older version of initEvents(), now deprecated
 * @deprecated
 * @param {Integer} x Timeout after page loads and gets events initially
 * @returns 
 */
async function getEvents(x) {
    window.addEventListener("load", event => {
        this.setTimeout( function() {
            console.log("Page is loaded!");
            let events = Array.from(this.document.getElementsByClassName(EVENT_CLICKABLE_CLASS_NAME));
            console.log(events);
            getEventsInfo(events);
        }, 500)
    });
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    })
}


/**
 * Initializes events for flairs upon page load
 * @returns 
 */
async function initEvents() {
    return new Promise(function(resolve) {
        window.addEventListener("load", event => {
            this.setTimeout( function() {
                console.log("Page is loaded!");
                let events = Array.from(this.document.getElementsByClassName(EVENT_CLICKABLE_CLASS_NAME));
                console.log(events);
                getEventsInfo(events);
                resolve(); // Page is loaded and events are initialized
            }, 500)
        });
    });
}


/**
 * Parse individual event for info and proper flair
 * @param {Element[]} events 
 */
function getEventsInfo(events) {
    events.forEach(item => {
        item.addEventListener("click", () => {
            this.setTimeout( function() {
                let eventBlob = document.querySelector("#xDetDlgDesc").innerHTML.match(/\[(.*?)\]/);
                let animeRequestKey = eventBlob[1];
                let eventContainer = document.querySelector(EVENT_CONTAINER_CSS_SELECTORS);
                imageInjector(animeRequestKey, eventContainer);
            }, 1);
        });
    });
}


/**
 * Main function execution upon DOM load; pulls user data and observes page for changes
 */
async function main() {

    // Check if anime data already pulled from MAL through local storage
    if (localStorage.getItem('hisho_initialized') == 'true') {
        console.log("Hisho is already initialized!");
    } else {
        console.log("Hisho is being initialized for the first time...");
        console.log(`Fetching anime data for user ${MAL_USERNAME}`);
        await getAnimeData(animeRequestUriWatching);
        await getAnimeData(animeRequestUriPlanToWatch);
        localStorage.setItem('hisho_initialized', 'true');
        // DELETE FAULTY KEYS IN LOCAL STORAGE, FIX LATER
        console.log("Cleaning faulty keys...");
        for (var key in localStorage) {
            if (key.includes("PeopleStackExperiments")) {
                localStorage.removeItem(key);
            }
        }
    }

    await initEvents(500);

    // Observer to look for changes in the page and search for events again
    const elementToObserve = document.querySelector(EVENT_DOM_TREE);
    console.log(elementToObserve);
    const observer = new MutationObserver(() => {
        console.log("Observer triggered!");
        let events = Array.from(this.document.getElementsByClassName(EVENT_CLICKABLE_CLASS_NAME));
        console.log(events);
        getEventsInfo(events);
    });
    observer.observe(elementToObserve, {childList: true, attributes: true,  characterData: true});

}



// MAIN EXECUTION

main();

// MAIN EXECUTION