const express = require('express');
const cors = require('cors');
const openAi = require('openai')
const bodyParser = require('body-parser')

const openAIConnection = new openAi({
    apiKey: "" // enter the api key
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const { prompt, level } = req.body;
    console.log(prompt, level)
    if (!prompt || !level) {
        return res.status(400).send({ error: "Input is required." });
    }

    try {
        const completion = await openAIConnection.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system", "content": `Consider the testing level as ${level} and use the prompt below
                You are a Test Analyst.
                You are to create a Test Plan document that contains the following Sections:
                1) Background
                2) Scope
                3) Assumptions
                4) Dependencies
                5) Approach to Testing
                6) Testing effort Estimate (WBS)
                To fill each section, refer to the following release data text from the system:` },
                { "role": "user", "content": prompt }
            ],
            max_tokens: 500
        });
        console.log(completion)
        res.status(200).send({ data: completion.choices[0].message });
    } catch (error) {
        console.log(error)
        console.error("Error occurred:", error.message);
        res.status(error.status).send({
            error: error.message
        });
    }
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
})