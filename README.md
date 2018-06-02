[![Chat on Gitter][gitter-image]][gitter-url]
[![dependencies Status][daviddm-image]][daviddm-url]
[![Build Status][travis-image]][travis-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

<p align="center">
   <img src="https://user-images.githubusercontent.com/2917613/39732681-b1ff33a0-5266-11e8-8c6e-d334811f1f2c.png" height="195">
<p>

# MMM-Monzo

![screen shot 2018-06-02 at 20 55 28](https://user-images.githubusercontent.com/2917613/40880393-c7bfc31c-66a7-11e8-9d73-5ed949e74dbc.png)

> Monzo Module for Magic Mirror

## Compatability

| Operating System     | Works? | Notes |
| -------------------- | ------ | ----- |
| Linux / Raspberry Pi | ✔      | -     |
| macOS                | ✔      | -     |
| Windows              | ✘      | -     |

## Installing

1.  Clone this repo into the `/modules` folder as usual
2.  run `$ npm install` in `/MMM-Monzo`

### Configuring

The final config should look something like this:

```js
        {
			module: "MMM-Monzo",
			position: "top_center",
			config: {
				clientId: "oauth2client_00009XfHYT...",
				clientSecret: "mnzconf.++er4iwMs4CtoYUdpRjpIn+UL6/NwqA88E...",
				accountId: "acc_00005Ufdh...",
				refreshToken: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJl..."
			}
		}
```

### Getting the Client ID and Client Secret

1.  Go to https://developers.monzo.com/apps/home
2.  Create a new `Confidential Client`
3.  Be sure to set the Redirect URL to: `http://localhost:8080/oauth`
4.  Your Client should look like: https://imgur.com/TOkANnq
5.  Keep note of the `Client ID`, `Client Secret`

### Getting the Account ID

Normally everybody should have 1, but if you have multiple Monzo cards (like me), then you have multiple account IDs. `MMM-Monzo` only supports 1 account at a time.

1.  Go to https://developers.monzo.com/api/playground
2.  Click on `List accounts` on the side
3.  Click on `Send` to fetch all accounts.
4.  Pick your account, most of the time there should only be one anyway. E.g. `acc_00005UxdhBxP1wQytx9dOX`

### Getting the Refresh token

1.  run `$ npm run token-helper` inside the `/MMM-Monzo` folder
2.  Follow the instructions

---

Made with 💖 by Dolan

[gitter-image]: https://badges.gitter.im/dolanmiu/mmm-monzo.svg
[gitter-url]: https://gitter.im/mmm-monzo/Lobby
[travis-image]: https://travis-ci.org/dolanmiu/MMM-Monzo.svg?branch=master
[travis-url]: https://travis-ci.org/dolanmiu/MMM-Monzo
[daviddm-image]: https://david-dm.org/dolanmiu/MMM-Monzo/status.svg
[daviddm-url]: https://david-dm.org/dolanmiu/MMM-Monzo
[greenkeeper-image]: https://badges.greenkeeper.io/dolanmiu/MMM-Monzo.svg
[greenkeeper-url]: https://greenkeeper.io/
