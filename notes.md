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

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

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
  <summary>## Javascript iteration formatting</summary>

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
</details>
