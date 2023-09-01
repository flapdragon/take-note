
# Take Note

## Description
This is a simple note taking application. It is assumed the user is an advocate or some sort of medical professional and they are logged in and using this app to take notes on meetings with clients. The app is intended to be intuitive enough so that the function of taking notes is as easy as possible.

It is intended to be mobile-friendly, in particular smartphone and tablets as those are portable since the advocate's job is also on the go.

The form validation is minimalist, and implemented the point of the view that the app itself is not and should not be the primary concern or focus of the user. What little validation is required is stated up front and gentle feedback on status is provided rather than immediate and aggressive red styling.


## Tech Stack
Next.js @ 13.4.19
React @ 18.2.0
Tailwind @ 3.3.3
Vercel Postgres (chosen for deployment to Vercel) @ 0.4.1
Bootstrapped by `npx create-next-app@latest`


## Getting Started

Node.js will need to be installed already. This project was built with v18.16.0.

  Grab the code:
```bash
git clone git@github.com:flapdragon/take-note.git
# or
$ git clone https://github.com/flapdragon/take-note.git
```

Install dependencies:
```bash
npm  install
# or
yarn
# I used npm for this  project.
```

Run the development server:
```bash
npm  run  dev
# or
yarn dev
```

You can view the app in your browser on the default Next.js url:port at [http://localhost:3000](http://localhost:3000).


## Live Site
A live demo of this app is deployed using Vercel at [https://take-note-one.vercel.app/](https://take-note-one.vercel.app/).


## TODO

1. Since this app takes in user input, and especially since it is publicly available without any authentication whatsoever in its current state, protections for SQLi and XSS need to be implemented, using libraries like dompurify.

2. Would certainly add a speech to text option for data entry for those that find that easier to work with.

3. Would add location services and data.

