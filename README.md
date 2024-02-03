### Commerce x Farcaster Frames Single-Item Guide

This guide explain how to sell a single item using via a Cast which allows your users to pay with crypto via Coinbase Commerce.

## Pre-requirements

1. Create a Coinbase Commerce account
2. (optional) Create a vercel account for easy deployment. Warpcast requires your Frame to be a `https://` domain/URL
3. An image of your item (`.png`, `.jpg`) with 1200 x 630 pixels

## Start here

1. Clone this repo by running
   ` git clone blah blah.git....`
2. Connect your github account to Vercel [official Vercel](https://vercel.com/docs/deployments/git#deploying-a-git-repository) guide for more details
3. replace the temporary image in the `public/` folder with the image of your product
4. replace the price of your product by changing the variable in the `utils.ts` file
5. upload your Commerce API Key credentials to Vercel settings page.
   ** hint ** for an app deployed at `https://commerce-frame-6r9h.vercel.app/` your settings page will be located at `https://vercel.com/hughescoins-projects/commerce-frame-6r9h/settings`
6. see the official Vercel guide on [environment variables](https://vercel.com/docs/projects/environment-variables) for more details

## Commit changes

```
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin git@github.com:Your-Github-Username/Your-Forked-Repo.git
git push -u origin master
```

Done!

# A redirect frame example

Built using [a-frame-in-100-lines](https://github.com/Zizzamia/a-frame-in-100-lines) by [Zizzamia](https://github.com/Zizzamia)

## Resources

- [Official Farcaster Frames docs](https://warpcast.notion.site/Farcaster-Frames-4bd47fe97dc74a42a48d3a234636d8c5)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
