<div align="center">
  <img src="src/assets/toksan_logo-text.svg" />
  <h1>Toksan - A Visual Novel RPG</h1>
</div>

<br />

### Setup in 1 Easy Step 🥳 🚀

- Just visit [The Toksan Website](https://www.toksan.ca/). That's it!

---

<br />

<div align="center">

PROJECT PHILOSOPHY • 
FEATURES • 
TECH STACK •
FUTURE PLANS

</div>

# 🧐 Project philosophy

> Toksan is a Visual Novel RPG set on the fanatasy Japanese island known as Toksan. Your goal is to investigate and take down a cult seeking to bring ancient Japanese Shinto deities into the world for their own gain.
> 
> The design is created in a way that is easy on the eyes, simple to understand, but familiar to anyone who's ever played a visual novel. The concepts of the game such as combat, item purchasing, and text-based interactions are created with the same philosophy. The game is meant to be enjoyed story-first, meaning while there is side content, it is not necessary to complete to enjoy the game.

# 📒 Features

Toksan is a fully featured visual novel with light RPG elements. The primary method of playing is through text-based interactions that progress the story. The RPG elements are things such as a currency system, Pokemon-esque battling, items/inventory, and more. The game also features a login/create account option to allow the player to save their money, inventory, and current story progress to their account. Users' not logged in cannot save.

# 👨‍💻 Tech stack

Here's a brief overview of the tech stack Toksan-Wiki uses:

- This project uses the [React](https://vuejs.org/) JavaScript framework for all of the heavy lifting, this includes rendering all of the pages, dynamically loading content, conditionally rendering components, and more.
- For content/data, the project uses [Google's cloud services of Firestore and Hosting](https://firebase.google.com/docs/firestore). The data is loaded using collections which the site uses within each component as needed. This does have its limits, as the potential amount of data will end up being quite large, and will consume a lot of reads quickly.
- The site is hosted using [Vercel](https://vercel.com), taking deployments from the GitHub repository. The site is also using a custom .tech domain.
- The web app uses the font [Heebo](https://fonts.google.com/specimen/Heebo) as the font-families for headings and paragraph text respectively.
- On top of these tools, the site uses VueX for state management, Vite for bundling, Vue PWA for manifest settings, and is styled using CSS3.

# 📅 Future Plans
- Fully responsive layout
- Full PWA support with mobile app
- Increased complexity for battles
- More items that affect different stats/abilities
- Music/VO
- More story content
