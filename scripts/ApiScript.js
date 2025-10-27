
const API_KEY = 'AIzaSyCQ5mSKu39i4nDAd20vvtz70bvkiz-ddvk'; 

async function generateContent() {
    const prompt = document.getElementById('promptInput').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerText = 'Generating...';

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;
        outputDiv.innerText = generatedText;

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        outputDiv.innerText = `Error: ${error.message}`;
    }
}

document.getElementById('generateButton').addEventListener('click', generateContent);