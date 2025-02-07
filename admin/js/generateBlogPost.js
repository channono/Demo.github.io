const fs = require('fs');
const path = require('path');

function generateBlogPost(data) {
    const templatePath = path.join(__dirname, '../blog/posts/template.html');
    const outputPath = path.join(__dirname, `../../website/blog/posts/${data.title.replace(/\s+/g, '-').toLowerCase()}.html`);

    fs.readFile(templatePath, 'utf8', (err, template) => {
        if (err) {
            console.error('Error reading template:', err);
            return;
        }

        let content = template;
        content = content.replace('{{ post_title }}', data.title);
        content = content.replace('{{ post_content }}', data.content);
        content = content.replace('{{ author_name }}', data.authorName);
        content = content.replace('{{ author_title }}', data.authorTitle);
        content = content.replace('{{ author_avatar }}', data.authorAvatar);
        content = content.replace('{{ publication_date }}', data.publicationDate);
        content = content.replace('{{ status }}', data.status);
        content = content.replace('{{ post_tags }}', data.tags.join(', '));
        content = content.replace('{{ featured_image }}', data.featuredImage);

        fs.writeFile(outputPath, content, 'utf8', (err) => {
            if (err) {
                console.error('Error writing new blog post:', err);
                return;
            }
            console.log('New blog post created successfully:', outputPath);
        });
    });
}

// Example usage
const newPostData = {
    title: 'Ai in Manufacturing',
    content: '<p>Content of the blog post...</p>',
    authorName: 'Daniel',
    authorTitle: 'Reporter',
    authorAvatar: 'data:image/jpeg;base64,...',
    publicationDate: 'February 7, 2025',
    status: 'Published',
    tags: ['AI', 'Manufacturing', 'Technology'],
    featuredImage: 'data:image/webp;base64,...'
};

generateBlogPost(newPostData);
