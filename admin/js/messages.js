// messages.js

document.addEventListener("DOMContentLoaded", () => {
    const messagesContainer = document.querySelector("#messagesTableBody");

    async function loadMessages() {
        try {
            const response = await fetch('/website/admin/messages.json');
            if (!response.ok) {
                throw new Error('Failed to load messages');
            }
            
            const messages = await response.json();
            displayMessages(messages);
        } catch (error) {
            console.error('Error loading messages:', error);
            alert('Failed to load messages. Please try again.');
        }
    }

    function displayMessages(messages) {
        messagesContainer.innerHTML = messages.map(message => `
            <tr onclick="toggleMessageExpansion(this)">
                <td>${formatDate(message.timestamp)}</td>
                <td>${message.name}</td>
                <td>${message.email}</td>
                <td>${message.subject}</td>
                <td><div class="message-content">${message.message}</div></td>
            </tr>
        `).join('');
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }

    function toggleMessageExpansion(row) {
        row.classList.toggle('expanded');
    }

    window.loadMessages = loadMessages;
    window.toggleMessageExpansion = toggleMessageExpansion;
    window.formatDate = formatDate;

    // Load messages when page loads
    loadMessages();
});
