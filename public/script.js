document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('survival-form');
    const itemsBody = document.getElementById('items-body');
    const qrDiv = document.getElementById('qrcode');
    const urlText = document.getElementById('deployed-url');

    // Load items on startup
    fetchItems();

    // Generate QR Code for the current page URL
    const currentUrl = window.location.href;
    new QRCode(qrDiv, {
        text: currentUrl,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    urlText.textContent = currentUrl;
    urlText.style.display = 'block';

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            item_name: formData.get('item_name'),
            category: formData.get('category'),
            must_have_level: parseInt(formData.get('must_have_level')),
            survival_reason: formData.get('survival_reason')
        };

        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                form.reset();
                fetchItems(); // Refresh the list
            } else {
                const err = await response.json();
                alert('Error: ' + err.error);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to submit item');
        }
    });

    async function fetchItems() {
        try {
            const response = await fetch('/api/items');
            const items = await response.json();

            itemsBody.innerHTML = '';
            items.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${escapeHtml(item.item_name)}</strong></td>
                    <td>${escapeHtml(item.category)}</td>
                    <td><mark>${item.must_have_level}</mark></td>
                    <td>${escapeHtml(item.survival_reason || '')}</td>
                `;
                itemsBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
