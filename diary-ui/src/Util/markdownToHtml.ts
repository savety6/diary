import {marked} from 'marked';

function markdownToHtml(markdown: string): string {
    return marked.parse(markdown);
}

export default markdownToHtml;