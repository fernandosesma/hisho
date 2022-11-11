![Hisho logo header](/resources/images/hisho.png)

---

![Chrome Extensions](https://img.shields.io/badge/chrome_extensions-4C8BF5?style=for-the-badge&logo=google-chrome&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)
![MyAnimeList](https://img.shields.io/badge/MyAnimeList-2E51A2?style=for-the-badge&logo=myanimelist&logoColor=white)

## Motivation

The inspiration for this project originally comes from [Google Calendar event images/flairs](https://ourtechroom.com/tech/google-calendar-event-image-list-google-calendar-flairs/). These flairs are nice images that align the top of an event popup when you click on it. For many who frequently look at their calendar during their day-to-day activities, these flairs add a nice touch to the user experience. For example, if I were to schedule a friend's wedding reception—it looks like this.

![Event with proper flair](/resources/images/wedding.png)

Google has never added support for user modification to flairs. Users cannot create their own flairs, choose from already existing flairs, or invoke their appearance outside of using specific [keywords](http://www.internetbestsecrets.com/2019/09/google-calendar-event-images.html) somewhere in the event's title or description. While there are many possibilities for a Chrome extension to add customization, *Hisho* begins with a very specific focus on how these flairs may be used. Further customization options are left as possible features that may be implemented in the future.

## About

_Hisho_ (秘書, Japanese for "secretary") is a chrome extension that adds customized flairs to your scheduled anime airtime events using the [MyAnimeList](https://myanimelist.net/) public API. Ergo, Google Calendar users will see a flair for that anime on the side of the event popup.

## Usage

Custom anime flairs may be invoked simply by specifying the anime's title **in brackets** anywhere in the event description. This title may be in *Romanized Japanese* or English—it varies by entry in MAL's database. However, it **must match the title that appears on its entry page** in MAL. For example, I've been watching [Mobile Suit Gundam: The Witch from Mercury](https://myanimelist.net/anime/49828/Kidou_Senshi_Gundam__Suisei_no_Majo) this season, and I want to put its airtimes in my calendar. However, when I go it's entry page in MAL, the title at the top is in *Romanized Japanese* as "Kidou Senshi Gundam: Suisei no Majo". If I put this title in brackets, an event flair for the anime will show on the event's popup like this:

![Event with custom anime flair](/resources/images/gwitch.png)

You can specify anything else in the event title and description.

## Local Development

Follow the steps below to work with the project on your local machine. You may utilize the command line or your favorite IDE.

| Objective | Command(s) |
| --------- | ---------- |
| Navigate to desired directory on local machine | `cd PATH/TO/DESIRED/DIRECTORY` |
| Clone *Hisho* repository | `git clone https://github.com/fernandosesma/hisho.git` |
| Set your MAL username | <ol><li>Navigate to `main.js` in your text editor of choice</li><li>Change the value of `MAL_USERNAME` to your username</li></ol> |
| Set Google Chrome Extensions to Developer mode and update | <ol><li>`start chrome`</li><li>Navigate to *chrome://extensions/*</li><li>Press "Update"</li></ol> |
| Go to Google Calendar | Open another tab and navigate to *calendar.google.com* |

From here, any changes you make to source code will be reflected upon saving and reloading the extension in *chrome://extensions/*. You can check if your anime watchlist data is syncing correctly by using **F12 > Application > Local Storage**. Local Storage can be cleared at anytime so that data may be resynced from scratch.

**Important Note: The current extension popup implementation has no function and serves as a placeholder. This will be changed in future builds.**

## Planned Features

The following is a list of planned features for the extension. **This list is subject to change at anytime and is never final.**

* Allow users to render anime event flairs at custom sizes or change with the event popup's dimensions
* Provide alternate event flair options such as choosing images, positioning and crop of images, etc.
* Automatically sync and schedule anime events in a user's Google Calendar
* Create a popup that allows users to specify their MAL username and sync their watchlist(s)
* Transfer the extension to the [*React*](https://reactjs.org/) framework