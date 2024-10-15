---
layout: post
title: "the loot retrospective"
date: 2024-10-15 00:00:00 -0700
permalink: /post/2024/the-loot-retrospective
categories: post
thumb: lretrospective
description: "yet another collection of two thousand words memorializing the ridiculously detailed story of lootcreate and its different incarnations. lend it your eyes to hear of hyperspecialized javascript terminology and subpixel woes!"
---

being fully transparent, i came up with the concept of lootcreate quite a long time ago when i was but 18 years old! after my first forays into the world of game development as an overambitious teenager resulting in many ideas still on the backburner, i finally decided i needed to make a couple more things with less scope before i could tackle any larger ideas. i don't remember the exact specifics of what led to the idea for lootcreate, but i know i'd taken **some** inspiration from a mutual friend i met around that time named annabelle.

it really wasn't much more inspiration than "you're making a pokemon style rpg? i'll make a way simpler version of that! how can i take pokemon and make it extremely simple... oh yeah! just take the base element of that game (catching unique things) and base the entire gameloop around it!" but it was inspiration nonetheless. i'd say drawing all 64 (63 if you don't count "nothing") sprites took a day or so, and the programming took another day or so.

i'd also say i was initially inspired by [kyle mcdonald's story](https://en.wikipedia.org/wiki/One_red_paperclip) of trading his way from a red paperclip to a house over the span of a full year. as ridiculously silly, circumstantial, and universally inapplicable as i knew the story was, i absolutely thought it'd make for a worthy video game idea! loose inspiration, i know. there isn't really much **trading** happening in the game, per se, but the spirit is the same! you're turning useless crap into useful crap!

<figure>
    <img src="/img/postpics/loot-1.3.png" alt="pitiful lootcreate 1.3 screenshot...">
    <figcaption>old and rusty.</figcaption>
</figure>

i'd started working on lootcreate 1.0 on march 22, 2020 and finished it up (aside from a few bugs i had to patch) on the 23rd. it was... a **little** barebones compared to nowadays. an impactful thing i learned from making the original version of the game is that barebones experiences are caused by overambition, overconfidence and the resulting burnout that comes from it. the original version didn't have cheat codes, settings, descriptions that are easily revisitable upon being rediscovered, support for anything other than a windows desktop environment--it was an exe file i coded in lua and love2d--or **achievements!**

it's not on my person at the moment, but i made a list of **139** achievements that i wanted to add to the original version. knowing how long and arduous it was simply playtesting the 39 achievements i wrote down on a whim for lootcreate 1.4, i don't think lootcreate would have existed if i'd tried putting in all of the originals! and if it did, it would've been a slog to get through... speaking of things in the original lootcreate that weren't in the remake, do you notice the different font in the screenshot? 

well, that's [super crestat](https://www.dafont.com/super-crestat.font), a fairly silly-looking and haphazardly-designed font i made and published around the same time. as happy as i am that i made it, looking back on it as a slightly more experienced designer, it has... a lot of problems. there's an inconsistent x-height, many of the letters seem to blend together, what parts should be curved or pointed, the glyph for the number 2 has a missing pixel causing an inconsistent line width... but those are just nitpicks. the biggest problem is that it tries filling a niche that's already been filled a million times over!

upon making a website i could be proud of, i wanted to push some old content onto it fairly soon. [picnic panic](/gamez/2024/picnic-panic) was already finished in javascript and ready to be packaged into a little iframe, and ironing out the bugs was relatively quick. lootcreate, though... i'd initially programmed in love2d and lua as an exe file. if i wanted to release it as a browser game, i'd have to remake it completely! well, there is a love2d web builder out there, but it's pretty old, comes with some downsides and doesn't always work perfectly. thus, to work i went!

i programmed and drew things for lootcreate a few hours a day for a little over four full days before releasing it, and i'm only *saying* it's a few hours simply to account for my easily distracted nature. it was *my intention* to work on the game all day every day until it was finished. as you can see from the first screenshot, the ui was originally made of random instructions telling you what keys to press. buttons are a teensy bit difficult in love2d, considering lua isn't exactly an object-oriented language with easy means of instantiation. if i wanted this game to be mobile-friendly at all, i'd have to add some clickable buttons and fancy spritework. so i did!

<figure>
    <img src="/img/postpics/bmgermar.png" alt="the bm germar font">
    <figcaption>bitmapmania made it. they've made a bunch of others that'll come in handy eventually too!</figcaption>
</figure>

since super crestat wasn't quite cutting it as a font, i sifted through hundreds of different pixel fonts to find just the right one for the job! i wanted something that looked similar, but not **too** similar, and something that had about the same pixel size. unfortunately, though, super crestat is a 12 px. font and i'd wager a guess that more than half of the 100% free bitmap fonts on dafont are sized at 16 pixels.

math time! i inflated the resolution from 640x360 to 960x540 and i didn't want the text to take up much more or less space on the screen than it did. a similar 150% increase to the font size would leave me with an 18 pixel font, but that would leave me with a 1:1 pixel ratio with the native canvas resolution. since most of the sprites in this game were already 32x32, which is barely visible on a 960x540 canvas, i decided to use a 1:2 or 1:3 pixel ratio for almost all the sprites! 

an font with a 1:2 pixel ratio that's the **same relative size** as an 18 px. font would technically be a 9 px. font, though i ended up going full circle and choosing a slightly bold sans serif 12 px. bitmap font called [bm germar](https://www.dafont.com/bm-germar.font). it fit the artstyle more than just about anything else would! playing around with margins and line heights a little bit, i managed to make up for the 25% difference in font size between lootcreate 1.3 and 1.4 swimmingly.

as much as i loved working on picnic panic, programming it was an absolute unmitigated disaster. variables and functions were haphazardly splattered all over the place, the code was extremely [wet](https://en.wikipedia.org/wiki/Don't_repeat_yourself#WET) and all the data structures were deep and inaccessible to the point where it made me sick. i was **extremely happy** all of the UI code worked fine for what it was worth.

because i started working on the lootcreate remake on the 7th, immediately after the small break i took following the [minecraft musings](/post/2024/minecraft-musings) essay, my experience working on the nearly 3-year-old picnic panic codebase was still fresh in my mind. i **vowed** to do things differently this time. before settling on porting lootcreate to a browser environment, i wanted to recreate another game concept that will remain a secret for now, and i wanted to use a library called [phaser.js](https://phaser.io).

from my tiny bits of experience with it, it seems very well-made and speedy to make games with for someone who understands its ins and outs. i, however, unfortunately don't! i had trouble getting things set up and i decided i didn't want to battle with my own lack of experience when i was simply wanting to get something released. ultimately, i understand how to use pure javascript and html5 canvas much more.

<figure>
    <img src="/img/postpics/nerdtoni.png" alt="nerd toni">
    <figcaption>(beware, programming jargon incoming.)</figcaption>
</figure>

that being said, trying out phaser for a moment introduced me to the concept of using *es6 classes* as *gamestates* with another class keeping track of "global" data. i'd not yet linked together the concepts of encapsulation and preventing pollution of the global namestate, but it was kind of a lifesaver! sure, it resulted in 137 instances of the word "[static](https://en.wikipedia.org/wiki/Static_(keyword))" throughout the codebase, but it helped me put everything in a proper place while still working within a relatively freeing code structure!

the code isn't perfect, it's far from it. there are plenty of strange choices and pieces of data that could have been stored in and retrieved from a separate yaml or json file for neatness purposes, but almost every function and variable is kept in a class! everything's object-oriented, and i only plan on making things **more** object-oriented in the future!

something you might notice if you look through the codebase yourself is that i stored a lot of text measurements. until **very** recently, i thought the only way to center-align text in html5 canvas was by storing the text width when it's generated and subtracting half of it from the x position on the draw call. little did i know, html5 canvas has a function to align text without going through all the rigamarole! hooray!

<figure>
    <img src="/img/postpics/ew.png" alt="disgusting looking subpixel-rendered text">
    <figcaption>eww...</figcaption>
</figure>

the glaring problem is this: if i'm using a 1:3 pixel ratio for text too important to be in a 1:2 ratio, the determined x position **won't be an integer** after being halved if the width of the original 1:1 text--which i'm specifically avoiding having to calculate--is odd. this is a problem! with the previous method, i could just pipe the text width through a floor function and end up with an integer easily, which is why the name of the loot displayed in a 1:3 ratio after clicking the big crate is never blurry.

this ended up affecting the achievement menu, which heavily utilizes center-aligned text rendered with the text-align function built into html5 canvas. i couldn't find a quick, terse and performant solution for this. i considered adding a 100,000% CSS contrast filter backed with grayscale upon entering the achievement menu, making every pixel on the screen either black or white depending on what it was closest to.

this was a very bodged solution that *almost* worked! however, it made the silhouette of the "X" icon denoting a locked achievement muddy and unclear. i could've very well spent hours obsessing over it, but i decided to deal. as much as it irked me, i think a big thing i learned from remaking lootcreate is that... **what irks me will probably be the last thing to ever irk anyone else.**

and likewise, as hard as it is to admit it, what irks everyone else will probably be the last thing to irk me. with that, we come full circle to annabelle. we're still best friends today, and while she did it on her own accord without me explicitly asking, she beat the original lua-coded lootcreate by getting every item after i'd finished the 1.3 update. then, she beat this remade version by getting every achievement, making quite a few bugs very evident to me in the process, resulting in some day one patches that made the game much more stable!

i thought she deserved some credit for always being there during development and essentially shaping the game to what it was. thus, her name is eternally etched into the top-right corner of the game! without her, the thing would be a big mess. it might be silly of me to not try **beating my own game,** especially if it'd take not but a few hours, but i like to keep moving forward.

plus, in my experience, people are usually faaaairly willing to playtest things and give detailed accounts of their experience. that's not to say i don't feel guilty seeing people do it for free unprompted, but... that's neither here nor there. moral of the story: if you're putting achievements in your game, make sure to code them neatly; test each unique condition and group achievements together by condition. also, object-oriented programming is a great way to bring structure to a chaotic spaghetti codebase... also, maybe i should try out typescript. bye! ♥