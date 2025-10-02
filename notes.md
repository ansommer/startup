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

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

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
