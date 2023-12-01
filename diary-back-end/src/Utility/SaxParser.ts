import * as sax from 'sax';

interface Memory {
    title: string;
    subtitle?: string;
    content: string;
    date: Date;
    tags: string[];
}

class MemoryParser {
    private parser: sax.SAXParser;
    private currentTag: string = "";
    private isTitleCaptured: boolean = false;
    private isSubTitleCaptured: boolean = false;
    private isContentCaptured: boolean = false;

    private memory: Memory = {
        title: "",
        subtitle: "",
        content: "",
        date: new Date(),
        tags: []
    };

    constructor() {
        this.parser = sax.parser(true);
        this.setupParser();
    }

    private setupParser(): void {
        this.parser.onopentag = (node) => {
            this.currentTag = node.name;
        };

        this.parser.ontext = (text) => {
            if (this.currentTag === "h1" && !this.isTitleCaptured) {
                this.memory.title = text;
                this.isTitleCaptured = true;
            } else if (this.currentTag === "h2" && !this.isSubTitleCaptured) {
                this.memory.subtitle = text;
                this.isSubTitleCaptured = true;
            }
        };

        this.parser.onend = () => {
            console.log("Parsed Memory Object:", this.memory);
        };
    }

    public parseXML(xml: string): Memory {
        this.currentTag = "";
        this.isTitleCaptured = false;
        this.isContentCaptured = false;
        this.memory = {
            title: "",
            content: "",
            date: new Date(),
            tags: []
        };

        this.parser.write(xml).close();
        return this.memory;
    }
}

export default MemoryParser;
