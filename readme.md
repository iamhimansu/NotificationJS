

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://iamhimansu.github.io/notification.js/">
    <img src="./images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">notification.js</h3>

  <p align="center">
    Create awesome notiifcation, with less codes.
    <br />
    <br />
    <br />
    <a href="https://iamhimansu.github.io/notification.js/">View Demo</a>
  </p>
</p>



<!-- ABOUT THE PROJECT -->
## About The Project


Notifications play a significant role in enhancing user experiences, and helps the users to find what they are looking for.

Creating and managing notification is a tedious task, specially for web developer who are already busy in giving something new to the world, thus notification.js comes into play.


* Your time should be focused on creating something amazing. A project that solves a problem and helps others :smile:
* You shouldn't be doing the same tasks over and over like creating a everything from scratch.
* However, notification.js is currently under development... 😒. 


### Dependencies
As Bootstrap framework is very commonly used, thus for icons and animations, notiification.js uses these two services.
* [Bootstrap Icons](https://icons.getbootstrap.com)
* [Animate CSS](https://animate.style)



<!-- GETTING STARTED -->
## Getting Started

Download the ```dist``` folder , and get started with creating awesome notification.

### Installation

1. Place `notification.min.css` file in the <head></head>.
2. Example: 
    ```HTML
    <head>
      <link rel="stylesheet" href="path/to/folder/notification.min.css" />
    </head>
    ```
3. Place `notification.min.js` file before end of body tag
4. Example:
    ```HTML
    <body>    
      <script src="path/to/folder/notification.min.js"></script>
    </body>
    ```
5. Add a `div` with class `.notification-container`
6. Example:
    ```HTML
    <div class="notification-container">
    </div>
   ```
 7. That's all. :smile:

<!-- USAGE EXAMPLES -->
## Usage

  To create a notification
  
  Just call the create method....
  Example: 
  ```JS
  Notification.create({
      head:"",
      body:"",
      footer:"",
      html:"",
      duration:"",
  });
  ```
  
Done... You should see a notification :blush:

_For more examples, please refer to the [Documentation](https://iamhimansu.github.io/notification.js/.com)_
## Configs
  ```JS
  Notification.configs({
  stacking:true, //Default is set to true, 
  //If stacking is set to true, notifications that are out of viewport will be hidden, and a `Show all` button will appear to show overflowed notifications. 
  });
  ```
## Options 

  ```JS
  head:""  //The content inside heade will be inject into notificaation title,
  body: "" //The content inside body will be injected into notification body,
  footer: "" //The content inside footer will be injected into notification footer,
  html: true, //Default is set to true, If html is set to false, all contents will be injected as text contents.
  ```
 ## Modifications
 1. The CSS file consists all the classes, you can edit according to your needs.
 2. Some common modification classes would be:
 3. `Notification header` edit:
 4. ```CSS
      .notification-container > .notification > .notification-header {
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        max-height: 50px;
        background-color: blanchedalmond;
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
      }
    ```
 5. `Notification footer` edit:
 6. ```CSS
      .notification-container > .notification > .notification-footer {
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        max-height: 50px;
        background-color: #fdfdfd;
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
      }
    ```
7. If you want to customize more, you always can.
 
 ## Contribution
 Any improvements from your side is most welcome :blush:
 
<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Instagram Username - [@himanshu_raj_07](https://www.instagram.com/himanshu_raj_07)

Project Link: [https://github.com/iamhimansu/notification.js](https://github.com/iamhimansu/notification.js)
