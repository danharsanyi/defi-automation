# Defi Automation
An API for automating your Defi Projects, deployed on GCP App Engine.

## Supported Projects:

**Drip**
- Hydrating (Compounding)
- Claiming

## Motivation
I had two main motivations for this project:

1) I was sick of having to remember to hydrate my Drip wallet every 24 hours. There are days I don't have my computer with me and I just wanted to set and forget
2) Learn more about interacting with the Ethereum blockchain

## Security Disclaimer
Of course, signing transactions requires a private key. I fully expect that no one will use this tool becuase of this. But it's useful for me, and the computing resources cost ~$0 so I figure why not open it up for others to use?

Defintely inspect the code, but you'll see that nothing is ever logged.

Feel free to deploy your own instance if you prefer, there's nothing in the code that ties it to my wallet specifically.

## Usage
Essentially, you send a POST request (I've set up a Cloud Scheduler Cron Job) to the corresponding project endpoint with your wallet address, private key and action, the service will do the rest.
**Drip**
```
POST: "https://defi-automation.ts.r.appspot.com/v1/webhooks/drip"

body: {
  "wallet": "<your-wallet-address>",
  "key": "<your-private-key>",
  "action": "hydrate" OR "claim"
}
```
