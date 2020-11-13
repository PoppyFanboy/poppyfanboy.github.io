document.querySelectorAll('[id$=-post-focus-button]').forEach(focusButton => {
    focusButton.addEventListener('click', function() {
        const postId = this.id.match(/^(.*)-post-focus-button$/)[1];
        console.log(postId);
        const contentWrapper = document.getElementsByClassName('content-wrapper')[0];
        const currentPost = document.getElementById(postId);

        if (contentWrapper.style.visibility == 'hidden') {
            contentWrapper.style.visibility = 'visible';
            currentPost.style.visibility = 'inherit';
            focusButton.style.backgroundColor = "";
            focusButton.style.color = '';
        } else {
            contentWrapper.style.visibility = 'hidden';
            currentPost.style.visibility = 'visible';
            focusButton.style.backgroundColor = 'var(--nav-selected-bg-color)';
            focusButton.style.color = 'var(--nav-selected-color)';
        }
    });
});