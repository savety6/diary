const markdownToHtml = (markdown: string): string =>{
    // Replace markdown syntax with HTML tags
    let html = markdown
        .replace(/# (.+)/g, '<h1>$1</h1>')
        .replace(/## (.+)/g, '<h2>$1</h2>')
        .replace(/### (.+)/g, '<h3>$1</h3>')
        .replace(/#### (.+)/g, '<h4>$1</h4>')
        .replace(/##### (.+)/g, '<h5>$1</h5>')
        .replace(/###### (.+)/g, '<h6>$1</h6>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');

    return html;
}

export default markdownToHtml;