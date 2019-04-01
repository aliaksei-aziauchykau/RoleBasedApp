import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from "events";

@Component({
    selector: "mc-tag-editor",
    templateUrl: "./tag-editor.component.html",
    styleUrls: ["./tag-editor.component.scss"]
})
export class TagEditorComponent implements OnInit {
    @Input() tags: string[] = ["one", "two"];
    @Output() onTagsChange: EventEmitter = new EventEmitter();

    public currentValue: string;
    constructor() { }

    ngOnInit(): void { }

    public get isAlreadyExist(): boolean {
        return this.tags.some(x => x === this.currentValue);
    }

    public get isEmpty(): boolean {
        return !Boolean(this.currentValue);
    }

    public get isDisabled(): boolean {
        return this.isAlreadyExist || this.isEmpty;
    }

    public add() {
        this.tags.push(this.currentValue);
    }

    public remove(value: string) {
        this.tags = this.tags.filter(x => x !== value);
    }
}
