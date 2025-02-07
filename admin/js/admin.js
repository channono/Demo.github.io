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
            this.submit();
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

    // Load existing posts
    if (document.querySelector("#postsContainer")) {
        fetch("get_posts.cgi")
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
});
