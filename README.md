# Travel Packing App

A (kind of but not really) by the book implementation of the Travel Packing App in [Svelte & Sapper in Action](https://www.manning.com/books/svelte-and-sapper-in-action).

## There be monsters

This app is not at all functional, but it was enough for me to learn how not to do svelte and some of the reasoning behind _why_ svelte works the way it does.

## Changes from the book

I followed along [the implementation in the book](https://github.com/mvolkmann/svelte-and-sapper-in-action/tree/master/travel-packing-ch16) until Chapter 17, when it started building apis in js. I'm planning to build apis in golang so I just read the book instead of trying to implement the rest of the changes.

#### Using typescript

This was straightforward to setup and use, there are templates that "just work".
In an attempt to make the code less spaghettified than the book I shoved a lot of the state into an OOP-esque model folder. Because of the incrementalness (and slight contrivance) of implementing it chapter by chapter it still turned into spaghetti and also some of the bindings don't work. I've done some research and Custom Stores are the thing that I want and will be implementing in the next svelte project.

#### Using snowpack

Originally this was fine! Using snowpack didn't take any setup time, mostly just time understanding what it was for and why it was different than rollup or webpack. I kind of like the idea of snowpack -> rollup for production builds and sveltekit seems to be on track to handle this well. 

Speaking of sveltekit...

#### Using Sveltekit.

This is definitely not ready for production. I was warned but my hubris caused me to try using it instead of sapper. The cave collapsed and nothing works now. Even the tests and tailwind which were kind of working and I spent a lot of time figuring out are broken. The future looks bright but that future isn't now.

#### Using Tailwind

I don't have any plans to learn actual css, especially with all the browser specificity. Just give me a cheap abstraction with the most common usages and I'll figure something out. That's pretty much exactly what tailwind is. It was a pain to setup but I think it worked (at least before the sveltekit refactoring disaster...). I only got around to styling the login component because I wanted to learn svelte and will probably be buying tailwind-ui when I need to make something pretty.

#### Tests

I usually love tests, especially when exploring a new thing. The "out of the box" experience with snowpack is kind of awful. I don't particularly like web-test-runner and will be switching to mocha + jsdom for anything in the future. The tests were _super_ broken after trying to refactor to sveltekit.