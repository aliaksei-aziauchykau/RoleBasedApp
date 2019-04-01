import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { GenericListItem } from "../models/generic-list-item.model";

@Component({
    selector: "mc-generic-list",
    templateUrl: "./generic-list.component.html",
    styleUrls: ["./generic-list.component.scss"]
})
export class GenericListComponent implements OnInit {

    @Input() items: GenericListItem[] = [];
    @Output() onChange: EventEmitter<GenericListItem> = new EventEmitter();
    public selectedItem: GenericListItem;

    constructor() { }

    ngOnInit(): void { }

    selectItem(item: GenericListItem) {
        this.selectedItem = item;
        this.onChange.emit(item);
    }
}
