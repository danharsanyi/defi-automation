import fetch from 'node-fetch';

type SlackConfig = {
  url: string
}

type SlackMessageElements = {
  method: string;
  success: boolean;
  gasUsed: number;
  transactionHash?: string;
  wallet?: string;
}

export type SlackNotification = {
  text?: string;
  blocks?: any;
}

export const Slack = (config: SlackConfig) => {
  const { url } = config;

  const formatMessage = ({method, success, gasUsed, transactionHash, wallet}: SlackMessageElements): SlackNotification => {    
    return {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `• Contract method: \`${method}\` \n • Status: ${success ? ':white_check_mark:' : ':x:'} \n • Gas used: ${gasUsed}`
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "View transaction",
                "emoji": true
              },
              "url": `https://bscscan.com/tx/${transactionHash}`
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "View wallet",
                "emoji": true
              },
              "url": `https://bscscan.com/address/${wallet}`
            },
          ]
        }
      ]
    }
  }


  const postMessage = async (notification: SlackNotification) => {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification),
    });
  }

  return {
    post: async(notification: SlackNotification) => await postMessage(notification),
    formatMessage: (elements: SlackMessageElements) => formatMessage(elements),
  }
}
