# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [Writing Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Setting up the repository

(Re)Learned about pushing/pulling/committing etc. with git. Good refresher after 1.5 years of 0 coding

## AWS

My IP address is: 3.80.25.253

My custom domain name is: thecollegekitchensurvivalguide.click

This is where we made an EC2 (Elastic Connection). That basically makes it so I can rent a virtual computer, and manage my website remotely. Instead of like, having my own physical servers. They are in N. Virginia.

## Caddy

My website is now secure! Using my key, caddy and let's encrypt. [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

Not too bad to do. My brain wants to already start solving the 'how' of things, actually code stuff to interact. But I can see how setting it up visually first without that will help me to be better organized. Hope I did it right because it's still kind of hard to envision what I will actually be able to do in the future and how I will use things.
One thing though, if I say startup.thecollegekitchensurvivalguide.click, it works. But if I start from thecollegekitchensurvivalguide.click and click startup, it doesn't go to my startup. I couldn't find instructions on how to edit that.

## CSS

Once things were set up it was pretty fun. My favorite part was making the cards for the recipe posts. It's crazy how something from my brain can get put on the computer.
Basic structure of how it works. 1. I build some html 2. If I want the html to be formatted a little differently I make a class for it. 3. Use CSS to format that class

## React Part 1: Routing

Doing it two times with simon and my startup definitely helped me understand this. So basically we were stealing the code from the html and make it work for react.
Here's the code for deploying because I always get confused ./deployReact.sh -k ../260keyIMPORTANT.pem -h thecollegekitchensurvivalguide.click -s startup

## React Part 2: Reactivity

Honestly this was a awkward middle step. I wanted to get it to where everything was 100% working and I started trying to implement an API before I realized that wasn't part of thus deliverable and I still don't have all the tools/knowledge for that...
So I hope that I did this deliverable correctly.... I basically just tried to get everything working up to the point of where I would need a backend. For example, you can like a post but there's not a way for the post to keep the likes across different users.

## Service
I ran into a lot of problems trying to use one api. The key was just to give up on that api and just try a different one. Worked great! way easier! Anyway it's basically just using the endpoints to make things work rather than internally.
I breifly tried to put in the ability to post a recipe using only a URL but it just used too many API points. It's in there but commented out until I want to implement it. If I were to continue I'd make it like a 'premium' option.

## Database
Things to get it working:

dbConfig with the host, username, and password (put it in the git ignore)

npm install mongo (make a folder and put it in, i think you have to do npm init -y first too)

npm install cookie-parser express bcryptjs uuid (install that in the most outside directory)

npm run dev

node index.js (from the service directory)

refresh mongo :)

I'm not sure if I keep putting the installs in the wrong place or what but every time I try to deploy I have problems with it even though I KNOW I already installed them. Also note to self never change the password ever again. What a hassle.

## Notes for the midterm

<details>
  <summary>## Just straight up answering the questions</summary>


  **1. The default CSS display property value for the HTML <span> element is: inline**
  `<span>` is an HTML element used to group or wrap inline content without introducing any structural change to the page.
  It does not create a new line before or after itself (unlike `<div>`).
  Primarily used for styling or applying scripts to a portion of text.
  Inline elements flow along with the text and do not start on a new line.

  **2. How would you use CSS to change all the div elements to have a background color of red?**
  ```css
  div {
    background-color: red;
  }
  ```
  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      div {
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div>First div</div>
    <div>Second div</div>
  </body>
  </html>

OR

  <link rel="stylesheet" href="styles.css">
  ```

  **3. How would you display an image with a hyperlink in HTML?**
  ```html
  <a href="https://www.example.com">
    <img src="image.jpg" alt="Description of image">
  </a>
  ```
  `<a href="URL">` → creates a clickable link to the URL.
  `<img src="image.jpg" alt="...">` → displays the image.
  When the user clicks the image, it will take them to the link specified in the `<a>` tag.

  **4. What does the following code using map with an array output?**
  ```javascript
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(num => num * 2);
  console.log(doubled);
  ```
  `.map()` creates a new array by applying a function to each element of the original array.
  Here, `num => num * 2` doubles each number.
  The original array `numbers` stays unchanged.

  **5. Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?**
  ```html
  <p>double <span class="green-text">trouble</span></p>
  ```
  ```css
  .green-text {
    color: green;
  }
  ```

  **6. How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?**
  ```javascript
  const element = document.getElementById("byu");
  element.style.color = "green";
  ```

  **7. How do you declare the document type to be html?**
  `<!DOCTYPE html>`

  **8. Is it possible to add new properties to javascript objects?**
  Yes.
  Ex1: Dot Notation, Ex2: Bracket notation
  ```javascript
  const person = {
    name: "Alice",
    age: 25
  };
  
  // Add a new property
  person.isStudent = true;
  
  console.log(person);
  // Output: { name: "Alice", age: 25, isStudent: true }


  Ex2
  const person = {
    name: "Alice",
    age: 25
  };
  
  // Add a new property
  person["city"] = "New York";
  
  console.log(person);
  // Output: { name: "Alice", age: 25, city: "New York" }
  ```

  **9. If you want to include JavaScript on an HTML page, which tag do you use?**
  _The JavaScript code goes between the <script> and </script> tags._
  ```javascript
  <!DOCTYPE html>
  <html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello!</h1>
  
    <script>
      console.log("This is JavaScript inside the HTML file");
    </script>
  </body>
  </html>

  OR separate .js file
  <!DOCTYPE html>
  <html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello!</h1>
  
    <script src="script.js"></script>
  </body>
  </html>
  ```

  **10. Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?**
  # Domain Breakdown: banana.fruit.bozo.click
  | Part     | Description                                                         |
  |---------|---------------------------------------------------------------------|
  | `click`  | **Top-Level Domain (TLD)** – the highest-level domain (like `.com`) |
  | `bozo`   | **Root / Second-Level Domain** – the main registered domain         |
  | `fruit`  | **Subdomain** – a subdivision of the root domain                    |
  | `banana` | **Sub-subdomain** – a further subdivision under `fruit`             |

![domainNameParts](https://github.com/user-attachments/assets/55c6079c-429e-475b-bd10-12113c201f7d)

  **11. Is a web certificate is necessary to use HTTPS.**
  Yes
  What a Web Certificate Does:
  -Encrypts communication
  -Prevents eavesdroppers from reading sensitive data (like passwords or credit card numbers).
  -Authenticates the website
  -Confirms the server’s identity so users know they’re connecting to the legitimate site.
  -Enables the browser to show the padlock icon
  -Indicates a secure connection in the address bar.
  
  How it Works:
  -A certificate is issued by a Certificate Authority (CA).
  -When a browser connects to a website via HTTPS, the server presents the certificate.
  -The browser verifies the certificate and establishes a secure, encrypted connection.

  **12. Can a DNS A record can point to an IP address or another A record.**
  # DNS Record Summary: A vs CNAME

  | Record Type | Can it point to an IP? | Can it point to another domain? |
  |------------|----------------------|--------------------------------|
  | **A**      | ✅ Yes               | ❌ No                           |
  | **CNAME**  | ❌ No                | ✅ Yes                          |

  An A record is a straight mapping from a domain name to IP address. A CNAME record maps one domain name to another domain name.

  **13. Port 443, 80, 22 is reserved for which protocol?**
  # Common Port Numbers and Protocols
  | Port | Protocol | Description |
  |------|----------|-------------|
  | 80   | HTTP     | Standard port for unencrypted web traffic. |
  | 443  | HTTPS    | Standard port for secure web traffic (HTTP over TLS/SSL). |
  | 22   | SSH      | Secure Shell, used for secure remote login and file transfer. |

  
</details>

<details>
  <summary>## Common HTML elements</summary>

Modern HTML contains over 100 different elements. Here is a short list of HTML elements that you will commonly see.

| element   | meaning                                                                |
| --------- | ---------------------------------------------------------------------- |
| `html`    | The page container                                                     |
| `head`    | Header information                                                     |
| `title`   | Title of the page                                                      |
| `meta`    | Metadata for the page such as character set or viewport settings       |
| `script`  | JavaScript reference. Either a external reference, or inline           |
| `include` | External content reference                                             |
| `body`    | The entire content body of the page                                    |
| `header`  | Header of the main content                                             |
| `footer`  | Footer of the main content                                             |
| `nav`     | Navigational inputs                                                    |
| `main`    | Main content of the page                                               |
| `section` | A section of the main content                                          |
| `aside`   | Aside content from the main content                                    |
| `div`     | A block division of content                                            |
| `span`    | An inline span of content                                              |
| `h<1-9>`  | **Text heading. From h1, the highest level, down to h9, the lowest**   |
| `p`       | **A paragraph of text**                                                |
| `b`       | Bring attention                                                        |
| `table`   | Table                                                                  |
| `tr`      | Table row                                                              |
| `th`      | Table header                                                           |
| `td`      | Table data                                                             |
| `ol,ul`   | **Ordered or unordered list**                                          |
| `li`      | List item                                                              |
| `a`       | Anchor the text to a hyperlink                                         |
| `img`     | Graphical image reference                                              |
| `dialog`  | Interactive component such as a confirmation                           |
| `form`    | A collection of user input                                             |
| `input`   | User input field                                                       |
| `audio`   | Audio content                                                          |
| `video`   | Video content                                                          |
| `svg`     | Scalable vector graphic content                                        |
| `iframe`  | Inline frame of another HTML page                                      |

**ex: second-level heading: `<h2>`**
</details> 

<details>
  <summary>## Basic CSS things</summary>
  
![cssDefinitions](https://github.com/user-attachments/assets/7aa12c28-8efd-439e-b920-f6d9dbd7a14b)

  Boxes:
  CSS defines everything as boxes. When you apply styles, you are applying them to a region of the display that is a rectangular box. Within an element's box there are several internal boxes. The innermost box holds the element's content. This is where things like the text or image of an element is displayed. Next comes the padding. The padding will inherit things like the background color. After padding is the border, which has properties like color, thickness and line style. The final box is the margin. The margin is considered external to the actual styling of the box and therefore only represents whitespace. It is important to understand each of these boxes so that you can achieve the desired visual result by applying the proper CSS declaration.
  
![cssBox](https://github.com/user-attachments/assets/3842da85-1757-4fae-a08d-bfb78f46b3b5)
  
  By default, the width and height of an element is defined by the width and height of the content box. You can change the box-sizing CSS property from the default value of content-box to border-box in order to redefine the width and height to also include the padding and the border. This often makes it easier to style elements when their visual size matches their actual size.

  **Padding is like wrapping something with bubble wrap, while margins are like blowing up a (square) balloon around it**
</details>


<details>
  <summary>## CSS Selectors</summary>

| Selector | Symbol | Attribute it matches | Uniqueness                  | Example HTML                  |
| -------- | ------ | -------------------- | --------------------------- | ----------------------------- |
| `#title` | `#`    | `id="title"`         | Unique (should appear once) | `<h1 id="title">Heading</h1>` |
| `.grid`  | `.`    | `class="grid"`       | Can repeat                  | `<div class="grid"></div>`    |

HTML:
```html 
<h1 id="title">Hello</h1>
``` 
CSS:
```css
#title {
  color: red;
}
```
HTML:
```html
<div class="grid">...</div>
<div class="grid">...</div>
``` 
CSS:
```css
.grid {
  display: grid;
}
```
</details>

<details>
  <summary>## Flex/summary</summary>

  **Flexbox and Images – Key Points**

  - Setting a container to `display: flex` makes all its direct children (including images) flex items.
  - Images are arranged in a row by default (`flex-direction: row`).
  - Spacing between images is controlled by `justify-content` (e.g., start, center, space-between, space-around).
  - Alignment of images along the cross-axis is controlled by `align-items` (e.g., flex-start, center, flex-end, stretch).
  - Image sizing can be controlled with `flex-grow`, `flex-shrink`, and `flex-basis`, allowing images to expand, shrink, or maintain a base size.
  - Use `max-width: 100%` and `height: auto` to preserve aspect ratio and prevent overflow.
  - By default, flex items stay on one line. `flex-wrap: wrap` allows images to move onto multiple rows when there isn’t enough space.
  - Flexbox doesn’t crop images but can stretch them if alignment is set to stretch.
  - Combining `flex-wrap` with `flex-basis` allows responsive multi-row image layouts.

  **Example header/main/footer sizing:**

  - `header` → `flex: 0 80px` → zero grow, basis 80px
  - `footer` → `flex: 0 30px` → zero grow, basis 30px
  - `main` → `flex: 1` → takes remaining space; can be set as a flex container itself

  **justify-content options:**

  - `flex-start` → images hug the start of the container
  - `center` → images are centered
  - `space-around` → equal space around each image
  - `space-evenly` → equal space between and around images

  **align-items options:**

  - `flex-start` → top
  - `center` → middle
  - `flex-end` → bottom
  - `stretch` → images stretch to fill container height (may distort)

  **Sizing properties:**

  - `flex-grow` → allows the image to expand
  - `flex-shrink` → allows the image to shrink
  - `flex-basis` → starting size before growing/shrinking

  ```css
  img {
    flex: 1 1 200px; /* grow=1, shrink=1, start width=200px */
  }
  ```
</details>

<details>
  <summary>## Arrow functions</summary>
  
  **2 examples:**
  ```JavaScript
  const functionName = (parameters) => expression;
  
  const functionName = (parameters) => {
    // multiple statements
    return value;
  };
  ```
 **So like these are equivalent:**
  ```JavaScript
  const a = [1, 2, 3, 4];
  
  // standard function syntax
  a.sort(function (v1, v2) {
    return v1 - v2;
  });
  
  // arrow function syntax
  a.sort((v1, v2) => v1 - v2);
  ```
</details>

<details>
  <summary># DOM - Document Object Model</summary>

  # DOM – Key Points

  ## Definition
  - The DOM (Document Object Model) is a programming interface for web documents.
  - Represents the page as a **tree of nodes**, where each node is an HTML element, attribute, or text.
  
  ## Hierarchy
  - The DOM is structured like a **tree**.
  - `document` is the root.
  - Elements have **parent**, **child**, and **sibling** relationships.
  
  ## Accessing Elements
  - `document.getElementById("id")` → select element by ID
  - `document.getElementsByClassName("class")` → select elements by class
  - `document.getElementsByTagName("tag")` → select elements by tag name
  - `document.querySelector(selector)` → select first element matching a CSS selector
  - `document.querySelectorAll(selector)` → select all elements matching a CSS selector
  
  ## Manipulating Elements
  - `element.innerHTML` → get/set HTML content
  - `element.textContent` → get/set plain text content
  - `element.style` → change CSS styles
  - `element.classList` → add, remove, or toggle classes
  
  ## Creating & Modifying Elements
  - `document.createElement("tag")` → create a new element
  - `parent.appendChild(child)` → add child element
  - `parent.insertBefore(newNode, referenceNode)` → insert before another node
  - `element.remove()` → remove an element
  
  ## Events
  - Events respond to user actions (click, input, scroll, etc.)
  - Add event listeners: `element.addEventListener("event", callback)`
  - Remove event listeners: `element.removeEventListener("event", callback)`
  
  ## Important Notes
  - The DOM is **dynamic**: changes in JavaScript immediately update the page.
  - The DOM treats everything as **nodes**, including text and comments.
  - Manipulating the DOM excessively can affect page performance.

![dom](https://github.com/user-attachments/assets/383752a0-1cc8-40e1-bdfa-cd08baf83c42)
  The Document Object Model (DOM) is an object representation of the HTML elements that the browser uses to render the display. The browser also exposes the DOM to external code so that you can write programs that dynamically manipulate the HTML.
  The browser provides access to the DOM through a global variable name document that points to the root element of the DOM. If you open the browser's debugger console window and type the variable name document you will see the DOM for the document the browser is currently rendering.
  For everything in an HTML document, there is a node in the DOM. This includes elements, attributes, text, comments, and whitespace. All of these nodes form a   big tree, with the document node at the top.

  All DOM elements support the ability to attach a function that gets called when an event occurs on the element. These functions are called event listeners. Here is an example of an event listener that gets called when an element gets clicked.
  **An event listener makes it respond to events, like clicks, typing, or hovering**
  **`getElmentById` finds an HTML element by its id attribute.**

  ```javascript
  const submitDataEl = document.querySelector('#submitData');
  submitDataEl.addEventListener('click', function (event) {
    console.log(event.type);
  });
  ```

  ```html
  <!DOCTYPE html>
  <html>
  <body>
    <button id="myButton">Click Me</button>
  
    <script>
      const btn = document.getElementById("myButton");
  
      btn.addEventListener("click", () => {
        console.log("Button was clicked!");
      });
    </script>
  </body>
  </html>
  ```
  `document.getElementById("myButton")` → selects the button element with the `id="myButton"`.
  `addEventListener("click", ...)` → sets up a click event listener on that button.
  The function inside the event listener executes only when the button is clicked.

</details>

<details>
  <summary>## Javascript  formatting</summary>

  **Iteration**
  ```javascript
  if (condition) {
    // code to run if condition is true
  } else if (anotherCondition) {
    // code to run if anotherCondition is true
  } else {
    // code to run if none of the above are true
  }

  for (initialization; condition; increment) {
    // code to run each loop iteration
  }

  while (condition) {
    // code to run while condition is true
  }

  switch (expression) {
    case value1:
      // code to run if expression === value1
      break;
    case value2:
      // code to run if expression === value2
      break;
    default:
      // code to run if no case matches
  }

  
  const color = "red";
  switch (color) {
    case "blue":
      console.log("Color is blue");
      break;
    case "red":
      console.log("Color is red");
      break;
    default:
      console.log("Color not found");
  }
  ```

  **Creating an object**
  ```javascript
  const person = {
    name: "Alice",
    age: 25,
    isStudent: true
  };

  OR

  const car = new Object();
  car.make = "Toyota";
  car.model = "Camry";
  car.year = 2020;

  OR

  const calculator = {
    add: function(a, b) {
      return a + b;
    },
    subtract(a, b) {
      return a - b; // shorthand syntax
    }
  };
  
  console.log(calculator.add(5, 3)); // 8
  ```
</details>

<details>
  <summary> ## JSON</summary>

  JavaScript Object Notation (JSON) was conceived by Douglas Crockford in 2001 while working at Yahoo! JSON, pronounced like the name Jason, received official standardization in 2013 and 2017 (ECMA-404, [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)).
  
  JSON provides a simple, and yet effective way, to share and store data. By design JSON is easily convertible to, and from, JavaScript objects. This makes it a very convenient data format when working with web technologies. Because of its simplicity, standardization, and compatibility with JavaScript, JSON has become one of the world's most popular data formats.
  
  ### Format
  
  A JSON document contains one of the following data types:
  
  | Type    | Example                 |
  | ------- | ----------------------- |
  | string  | "crockford"             |
  | number  | 42                      |
  | boolean | true                    |
  | array   | [null,42,"crockford"]   |
  | object  | {"a":1,"b":"crockford"} |
  | null    | null                    |
  
  Most commonly, a JSON document contains an object. Objects contain zero or more key value pairs. The key is always a string, and the value must be one of the valid JSON data types. Key value pairs are delimited with commas. Curly braces delimit an object, square brackets and commas delimit arrays, and strings are always delimited with double quotes.

  Example:
  ```javascript
  const jsonString = '{"name":"Alice","age":25}';
  // Convert JSON string to JavaScript object
  const obj = JSON.parse(jsonString);
  console.log(obj.name); // Output: Alice
  // Convert JavaScript object back to JSON string
  const newJson = JSON.stringify(obj);
  ```

  You can convert JSON to, and from, JavaScript using the `JSON.parse` and `JSON.stringify` functions.
  
  ```js
  const obj = { a: 2, b: 'crockford', c: undefined };
  const json = JSON.stringify(obj);
  const objFromJson = JSON.parse(json);
  
  console.log(obj, json, objFromJson);
  
  // OUTPUT:
  // {a: 2, b: 'crockford', c: undefined}
  // {"a":2, "b":"crockford"}
  // {a: 2, b: 'crockford'}
  ```
  
  Note that in this example, JSON cannot represent the JavaScript `undefined` object and so it gets dropped when converting from JavaScript to JSON.

</details>

<details>
  <summary> ## command line prompts</summary>

| Command | What it Does |
|---------|--------------|
| `chmod` | Changes file or directory **permissions** (read, write, execute). |
| `pwd`   | Prints the **current working directory**. |
| `cd`    | **Changes directory** (move to a different folder). |
| `ls`    | **Lists files and directories** in the current folder. |
| `vim`   | Opens the **Vim text editor** to edit files. |
| `nano`  | Opens the **Nano text editor**, simpler than Vim. |
| `mkdir` | **Creates a new directory**. |
| `mv`    | **Moves or renames files/directories**. |
| `rm`    | **Removes (deletes) files**. Use `-r` to remove directories recursively. |
| `man`   | Displays the **manual/help page** for a command. |
| `ssh`   | **Connects to a remote server** securely via SSH. |
| `ps`    | Shows **running processes** on the system. |
| `wget`  | **Downloads files from the internet** via command line. |
| `sudo`  | Runs a command with **superuser/root privileges** (admin rights). |


  **The console command that creates a remote shell session is: ssh**

  **-la**
  When you use the -la parameter with the ls command in the terminal, it combines two options: -l and -a.

  ls -l → long listing format
  -Shows detailed information for each file, such as:
  -Permissions (read/write/execute)
  -Number of links
  -Owner and group
  -File size
  -Last modification date
  
  ls -a → all files
  -Includes hidden files that start with a dot . (like .gitignore or .bashrc)
  
  Combined: ls -la
  Shows a detailed list of all files, including hidden ones.
</details>

<details>
  <summary> ## Promises </summary>

  Creating a Promise:
  `new Promise((resolve, reject) => { ... })` takes a function with two arguments: `resolve` and `reject`.
  Call `resolve(value)` when the operation is successful.
  Call `reject(error)` when the operation fails.
  
  Using a Promise:
  `.then()` → runs if the promise is resolved.
  `.catch()` → runs if the promise is rejected.

  Example:
  ```javascript
  const coinToss = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(Math.random() > 0.5 ? 'heads' : 'tails');
      } else {
        reject('fell off table');
      }
    }, 10000);
  });
  ```
  
  We then chain the `then`, `catch` and `finally` functions to the coinToss object in order to handle each of the possible results.
  
  ```js
  coinToss
    .then((result) => console.log(`Coin toss result: ${result}`))
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => console.log('Toss completed'));
  
  // OUTPUT:
  //    Coin toss result: tails
  //    Toss completed
  ```
</details>
