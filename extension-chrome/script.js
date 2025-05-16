const GEMINI_API_KEY = "";

document.getElementById("send").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value.trim();
    const chatBox = document.getElementById("chat-box");

    if (!prompt) return;

    chatBox.innerHTML += `<div class="user"><strong>Você:</strong> ${prompt}</div>`;

const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await res.json();

        if (res.ok) {
            const resposta = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta.";
            chatBox.innerHTML += `<div class="gemini"><strong>Gemini:</strong> ${resposta}</div>`;
        } else {
            const erroMsg = data?.error?.message || "Erro desconhecido.";
            chatBox.innerHTML += `<div class="gemini"><strong>Erro:</strong> ${erroMsg}</div>`;
        }
    } catch (err) {
        chatBox.innerHTML += `<div class="gemini"><strong>Erro:</strong> ${err.message}</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById("prompt").value = "";
});
