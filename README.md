# job-search-tracker

*still in development - MVP has been achieved.

### Backstory
I graduated from Flatiron School's coding bootcamp back in March. I felt confident in my skill and learning capacity, 
but I hadn't anticipated how much of a full-time grind the job search process would be. Between conversations I'd had 
with experienced engineers and blogposts I'd read online, it seemed like submitting cold applications was the worst 
path forward. The best approach seemed to be all about volume: lots of networking, lots of cold-emailing, lots of coffees, 
lots of projects, etc. I accepted the process, but quickly found myself feeling burnt-out from all the emailing. A question 
then popped in my head: "Could I make this process easier?" I figured I could. 

So I created this project. 

### What it does
I wanted basically to reduce the complexity of the job search process. So, instead of having a million 
different tabs open, having to manually enter metrics into a spreadsheet, having to copy and paste my cold-email templates in cases
when I'd use them, I created a project to store all that information in one place. 

This app:
- Is built with the MERN stack
- Uses Google OAuth and gmail APIs to authenticate users and send gmails from within the app
- Allows users to upload their resumes with Multer.js
- Uses Nodemailer to send emails (integrated with gmail) from within the app
- Uses Redux for state management
- Has data visualization with D3; visually displays some useful job-outreach related metrics
- Allows users to create email templates so that they can send emails in-app with customized values

Here's the dashboard, once a user has logged in. (I've logged in here through the Google OAuth2 API, and the profile image in the upper right hand corner is from my google profile.):

![Dashboard](https://i.imgur.com/tQ8tjvc.png)

From the menu on the left, a user can select to navigate to the jobs page, to create/view email templates, and to upload a resume. Here I'm creating an example email template. Right now, 
a user can use up to three interpolation values, and can choose to attach their resume to the email. I built this feature because I was using variants of the same introduction email when 
I'd contact recruiters or hiring managers for the first time. I also used a template for my follow up email; automating this feature allowed me to save time, where before I was copy and pasting
from an Evernote document into gmail, which was tedious.

![Create Template](https://i.imgur.com/KNqZZhc.png)

This is the main jobs page. I built this using Grid. Here, I've created an example company called "Example (Github)" for this README. This page has a search feature and a few filters. I've 
decided that I'm going to build more filters, but for now, this page by default shows me all active (non-rejected) jobs, and provides the options of seeing the rejected jobs and the jobs
I need to follow up on. The follow up feature calculates how long it's been since I've last emailed a company that hasn't replied to my email, and shows me all companies for which it's been
a week or longer. I built this feature because I found it annoying to check my spreadsheet of job applications and see which companies to follow up with; now, I don't have to do any work, my
app is doing the work for me. 

![Jobs](https://i.imgur.com/olGXt4e.png)

Here is the job's page. When a user creates a new job, a modal pops up that asks for the company's name, LinkedIn page, the job description, and the company's website. I can update 
the status of a company, selecting from options like "Haven't received a reply" or "Code challenge." A job's status allows me to filter among jobs on the previous jobs page, though its main 
purpose is to help with the data visualization of jobs I'm currently working on. I can also enter notes for each job. 

Here, I've created an example employee and have listed an old email address of mine. I decided to build a table out of the employees to make it visually easy to interpret. I built this feature because with so many job applications
sent, there's so much data to track, and it becomes difficult to do all of this (at least for me) in a regular spreadsheet. When I enter a user, a modal pops up that provides the top 10 or so
most repeated corporate email formats, which has been a tremendous help in finding the right email addresses for employees at companies I want to connect with. Each row in a table represents an
employee, and I track how many emails I've sent and whether I've received a reply. 

![Job Page](https://i.imgur.com/ZMe6kiA.png)

When I click "Send Email," I can select from my email templates or I can write a new email. Again, this prevents me from having to copy, paste, and edit my email templates, and it prevents
me from having to click between a bunch of tabs. Here, I'm selecting the template called "Github example." All of this was made possible by integrating Google's Gmail API (which took me a long
time to figure out). 

![Select Email](https://i.imgur.com/xlyhXxt.png)

And here's the email in my inbox:  

![Gmail Inbox](https://i.imgur.com/3bDMGfN.png)


### Thoughts
At bootcamp, I built a handful of fullstack projects. Some of them were impressive and fun to work on, but none of them 
felt important. I built a game, a mock social media platform, and some other projects. I kept getting bored of my projects, because I knew
they were just for my portfolio, and that no one was going to use them. This project is different. The idea for the project originated from a frustrating problem I had to deal with.
Instead of working harder, I tried working smarter. To that end, my job search process has become FAR more efficient, and, more importantly, I've learned
way more working on this project than I have on any other one. I continue to work on it. The thing I'm most proud of is that now I can apply to jobs with only one tab open!

I will continue to work on this project, as I think it will be helpful to other job-seekers. 
