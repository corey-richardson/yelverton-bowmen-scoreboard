# Yelverton Bowmen Score Display

[![wakatime](https://wakatime.com/badge/user/55c30436-1509-4eb9-9f18-fa9b7c6060c4/project/018e8aec-7a15-4f4a-b460-ea0204844fb0.svg)](https://wakatime.com/badge/user/55c30436-1509-4eb9-9f18-fa9b7c6060c4/project/018e8aec-7a15-4f4a-b460-ea0204844fb0)

The "Give It a Go" Event Score Display System is designed to showcase scores achieved by customers at "give it a go" events and community fêtes. By displaying scores publicly, the system aims to create a sense of competition among participants, encouraging them to keep coming back and engaging with the event.

## Built With

- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)

As this web application is likely to be used offline, these can't be downloaded via http. As such, I have directly included the files in the `lib` directory. This means the application can be used without internet access.

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)

## License

```
MIT License

Copyright (c) 2024 Corey Richardson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Download

To get started, clone or download the files from the GitHub repository. Open the file `index.html`.

1. Clone or download the repository from GitHub
    - Download as a ZIP file to your local machine and extract.
2. Open `index.html` - this is the main page of the web application.

## Usage

1. Upon opening `index.html`, the web application will open in your browser. This is the page where the scoreboard will be displayed.
- ![](/res/readme/index-page.png)
2. Navigate to the "About" page using the top navigation bar. On this page, information and an image slideshow related to the club is displayed. This can be displayed when customers enquire about the club, or simply during quieter times to advertise to passers by.
- ![](/res/readme/about.png)
3. To add new scores to the leaderboard, navigate to the "Add Score" page. Fill in and submit the form. Upon submission, the page will redirect to the main scoreboard page. Newly submitted scores will flash blue for 3 seconds to make easy to see which score is the customers. Refreshing the page will cause the row to flash again if it is missed the first time.
- ![](/res/readme/add-score.png)
- ![](/res/readme/scoreboard.png)
- ![](/res/readme/scoreboard-flash.png)
4. Clicking on the club logo in the top left corner will open the club's website.
5. To access the database, follow <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>i</kbd> to access Chrome Developer Tools, then `Application` > `IndexedDB` > `archery_scores` > `scores`. This section can be used to modify entries if needed. Checking `Application` > `Session Storage` > `file://` will display the current `flashId`; the database ID primary key of the most recent entry. 
6. To *entirely* clear the database, `Application` > `IndexedDB` > `archery_scores` > `Delete database`. This will delete every entry!
