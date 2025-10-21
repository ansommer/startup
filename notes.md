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
| `h<1-9>`  | Text heading. From h1, the highest level, down to h9, the lowest level |
| `p`       | A paragraph of text                                                    |
| `b`       | Bring attention                                                        |
| `table`   | Table                                                                  |
| `tr`      | Table row                                                              |
| `th`      | Table header                                                           |
| `td`      | Table data                                                             |
| `ol,ul`   | Ordered or unordered list                                              |
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
</details> 

<details>
  <summary>## Basic CSS things</summary>
  
![cssBox](https://github.com/user-attachments/assets/3842da85-1757-4fae-a08d-bfb78f46b3b5)
  
  Boxes:
  CSS defines everything as boxes. When you apply styles, you are applying them to a region of the display that is a rectangular box. Within an element's box there are several internal boxes. The innermost box holds the element's content. This is where things like the text or image of an element is displayed. Next comes the padding. The padding will inherit things like the background color. After padding is the border, which has properties like color, thickness and line style. The final box is the margin. The margin is considered external to the actual styling of the box and therefore only represents whitespace. It is important to understand each of these boxes so that you can achieve the desired visual result by applying the proper CSS declaration.
  
![cssBoxModel](https://github.com/user-attachments/assets/e6d6a6db-ec2c-497d-97af-51225dcdd10f)
  
  By default, the width and height of an element is defined by the width and height of the content box. You can change the box-sizing CSS property from the default value of content-box to border-box in order to redefine the width and height to also include the padding and the border. This often makes it easier to style elements when their visual size matches their actual size.
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

