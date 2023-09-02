
# Take Note

## Description
This is a simple note taking application. It is assumed the user is an advocate or some sort of medical professional and they are logged in and using this app to take notes on meetings with clients. The app is intended to be intuitive enough so that the function of taking notes is as easy as possible.

It is intended to be mobile-friendly, in particular smartphone and tablets as those are portable and the easiest to use for someone who has to travel as part of their job.

The form validation is minimalist and implemented from the point of the view that the app itself is not and should not be the primary concern or focus of the user. What little validation is required is stated up front and gentle feedback on status is provided rather than immediate and aggressive red styling.


## Description
A quick note on requirements. The only required field is the note body field, which must be >= 20 and <= 300 characters. I have also added a very simple regex check for spaces so that the user can't just enter spaces or enter mostly spaces.


## Tech Stack
Next.js @ 13.4.19<br />
React @ 18.2.0<br />
Tailwind @ 3.3.3<br />
Vercel Postgres (chosen for deployment to Vercel) @ 0.4.1<br />
Bootstrapped by `npx create-next-app@latest`<br />
The application was intended to be simple like a rapid prototype so I purposely chose not to include things like ORMs or other helpers, preferring the most direct, most understandle solution every time. This means that there is SQL directly in the API methods and that the app is handling some things that it normally wouldn't. This would obviously need to change for a larger app.


## Getting Started

Node.js will need to be installed already. This project was built with v18.16.0.<br />
You will also need Git.

  Grab the code:
```bash
git clone git@github.com:flapdragon/take-note.git
# or
git clone https://github.com/flapdragon/take-note.git
# and change into that directory
cd take-note
```

Install dependencies:
```bash
npm install
# or
yarn
# I used npm for this project.
```

Because I chose to deploy to Vercel and use their Postgres, there is the additional step of having to link your GitHub to Vercel and setup a Postgres database. Looking back this unfortunately makes the app not 100% self-contained git-clone-npm-run-dev-bam I'm up and running style.

While that is sad, it actually is super easy to use Vercel and I was done converting from SQLite3 to Vercel Postgres and deployed to a very free site in minutes.

Create a Vercel account:<br />
https://vercel.com/signup

Link your GitHub repo to your Vercel (you can choose as many or as few repos as you like):<br />
https://vercel.com/docs/deployments/git/vercel-for-github<br />
https://vercel.com/new (once you're logged in)

Setup a Vercel Postgres database amd link it to your repo:<br />
https://vercel.com/docs/storage/vercel-postgres/quickstart

Once you are done with the steps on their site you will need to setup a few more things on your machine and project.<br />
You will need to install the Vercel CLI:
```bash
npm i -g vercel@latest
```

You will need to pull down the .env.development.local file so that you can connnecto the database locally:
```bash
vercel env pull .env.development.local
```

You can likely create this file yourself and copy the fields from the site, omitting the global install, but I followed the instructions and everything worked as expected.

Now, run the development server:
```bash
npm run dev
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

4. The styling could use some work. In particular the page titles and the create and edit forms.
