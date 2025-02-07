document.addEventListener("DOMContentLoaded", () => {
    // Initialize Quill editor
    if (document.querySelector("#editor")) {
        const quill = new Quill("#editor", {
            theme: "snow"
        });

        // Handle form submission
        const postForm = document.querySelector("#postForm");
        postForm.addEventListener("submit", function(event) {
            event.preventDefault();
            document.querySelector("#hiddenContent").value = quill.root.innerHTML;
            // Save post data to local storage or another client-side storage
            savePost();
        });
    }

    // Handle tag input
    if (document.querySelector("#tagInput")) {
        const tagInput = document.querySelector("#tagInput");
        const addTagButton = document.querySelector("#addTagButton");
        const tagList = document.querySelector("#tagList");
        const hiddenTags = document.querySelector("#hiddenTags");

        addTagButton.addEventListener("click", () => {
            const tag = tagInput.value.trim();
            if (tag) {
                const tagElement = document.createElement("span");
                tagElement.className = "badge bg-secondary me-2";
                tagElement.textContent = tag;
                tagElement.addEventListener("click", () => {
                    tagList.removeChild(tagElement);
                    updateHiddenTags();
                });
                tagList.appendChild(tagElement);
                tagInput.value = "";
                updateHiddenTags();
            }
        });

        const updateHiddenTags = () => {
            const tags = Array.from(tagList.children).map(tagElement => tagElement.textContent);
            hiddenTags.value = tags.join(",");
        };
    }

    // Handle image previews
    if (document.querySelector("#authorAvatar")) {
        document.querySelector("#authorAvatar").addEventListener("change", function(event) {
            previewImage(event.target, "#avatarPreview");
        });
    }

    if (document.querySelector("#postImage")) {
        document.querySelector("#postImage").addEventListener("change", function(event) {
            previewImage(event.target, "#imagePreview");
        });
    }

    const previewImage = (input, previewElementSelector) => {
        const previewElement = document.querySelector(previewElementSelector);
        previewElement.innerHTML = "";
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.createElement("img");
                img.src = event.target.result;
                img.className = "img-thumbnail";
                previewElement.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    };

    // Load existing posts from static JSON
    if (document.querySelector("#postsContainer")) {
        fetch("posts.json")
            .then(response => response.json())
            .then(posts => {
                const postsContainer = document.querySelector("#postsContainer");
                posts.forEach(post => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${post.title}</td>
                        <td>${post.author}</td>
                        <td>${post.authorTitle}</td>
                        <td>${post.date}</td>
                        <td>${post.status}</td>
                        <td>${post.tags.join(", ")}</td>
                        <td>
                            <button class="btn btn-sm btn-warning">Edit</button>
                            <button class="btn btn-sm btn-danger">Delete</button>
                        </td>
                    `;
                    postsContainer.appendChild(row);
                });
            });
    }
    loadPosts();
});

// Save post function - Example implementation
function savePost() {
    const post = {
        title: document.querySelector("#postTitle").value,
        author: document.querySelector("#postAuthor").value,
        authorTitle: document.querySelector("#postAuthorTitle").value,
        date: new Date().toISOString().split('T')[0], // current date
        status: "Draft", // default status
        tags: document.querySelector("#hiddenTags").value.split(","),
        content: document.querySelector("#hiddenContent").value
    };

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    alert('Post saved successfully!');
    loadPosts();
}
