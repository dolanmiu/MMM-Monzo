const prompt = require("./prompt");
const request = require("request-promise");

console.log("Welcome to the Monzo OAuth helper!");
console.log("----------------------------------");
console.log();
console.log("- Be sure to create a 'Confidential' OAuth client in the Monzo Developer portal");
console.log(
    "- Be sure to set the return URL as 'http://localhost:8080/oauth' in the Monzo Developer portal",
);
console.log();
console.log("Things needed:");
console.log("- Client ID");
console.log("- Client Secret");
console.log("----------------------------------");

async function doWork() {
    await prompt("[Press any key to continue]");
    const clientId = await prompt("What is your Client ID: ");
    const redirectUri = "http://localhost:8080/oauth";
    const state = "mmm-monzo-token-helper";

    console.log(
        "Go to this link below, when you login, you should get a 'code' after redirection:",
    );

    console.log(
        `https://auth.monzo.com/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=state`,
    );

    await prompt("Please have the 'code' ready. [Press any key to continue]");

    const code = await prompt("What is the code: ");
    const clientSecret = await prompt("What is your client secret: ");
    const body = await request.post("https://api.monzo.com/oauth2/token", {
        form: {
            grant_type: "authorization_code",
            code: code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
        },
        json: true,
    });

    console.log("Here is your details:");
    console.log(JSON.stringify(body, null, 2));
    console.log("Please copy the refresh_code into your MMM-Monzo config");
}

doWork()
    .then(() => process.exit())
    .catch(console.error);
