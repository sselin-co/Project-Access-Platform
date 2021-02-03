# Project-Access-Platform
This is the working repo for our Project Access project, as part of the Menon Labs program. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and deployed with [Vercel](https://vercel.com/).

## Demo
View our submission overview video [here](https://vimeo.com/496798415?utm_source=email&utm_medium=vimeo-cliptranscode-201504&utm_campaign=28749).

## Getting Started
Our website is [deployed here.](https://pa-platform.vercel.app/)


If you want to run our site locally, follow these directions: Clone or download the .zip for the repo, navigate to the repo in command line, then run the development server:

```bash
npm run dev
# or
yarn dev
```
You will also need to declare a `.env.local` file in the top level directory that contains an Airtable API key and base ID. 

Open [http://localhost:3000](http://localhost:3000) with your browser to view our website.

## Product Design
You can view our UML Diagrams [here](https://lucid.app/lucidchart/invitations/accept/63338e18-7ff3-4ac6-a945-ec1f77d14dcd)

[Site Map](https://lucid.app/lucidchart/invitations/accept/cfaae816-1238-4d3d-ae9e-0c8db1aa43fc)

You can view all Figma Designs [here](https://www.figma.com/file/1veERhNjefvS6BrLyoWeST/Project-Access)

Specific Figma Designs:

- [Student Application Flow](https://www.figma.com/proto/KCjBaVhTcG8CZdcfVZZut9/Application-Flow-Student?node-id=2%3A14&viewport=576%2C335%2C0.07986868917942047&scaling=min-zoom)

- [Admin Application Flow](https://www.figma.com/proto/0Mq4LbXLKV8R1pyx0a1nNP/Application-Flow-Admin?node-id=1%3A16&viewport=567%2C379%2C0.08777683973312378&scaling=min-zoom)

- [Admin Prebootcamp Courses Flow](https://www.figma.com/proto/nmJUaQVMsryECjM7Xt0Yc3/Bootcamp-Flow-Admin?node-id=1%3A19&viewport=597%2C445%2C0.10269461572170258&scaling=min-zoom)

- [Student Prebootcamp Courses Flow](https://www.figma.com/proto/7itluWV1jRIrf7syMiToot/Bootcamp-Flow-Student?node-id=1%3A21&viewport=519%2C352%2C0.1103837862610817&scaling=min-zoom)

## Known Issues
- Logging out of an account sometimes won't reliably redirect the user to the homepage. 
- Admin flow for viewing a student's course progress and submitting feedback isn't complete. 
- Admin flow for an appealing student isn't complete. 
- Functionality to send emails to applicants on application status changes is implemented but needs to be interfaced with the front end.
- UI consistency and fluidness can be improved. Homepage could use an overhaul. 

## Missing Features
- A component displaying meta data about Project Access webinars and events and the ability to sign up for them.
- Mentor matching capabilities (we even have the designs for this!) 
- Admin flow for viewing an applicant's application process links to Airtable directly. Preferably this would be integrated with the site. 
- More robust data validation on both front and back ends.  
- Ability to add videos and hyperlinks to admin course builder. 
- A unit testing schema. 

