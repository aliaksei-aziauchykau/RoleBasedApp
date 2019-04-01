import { Input, ViewChild, OnInit, ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { SafeComponent } from "../../../../utils/safe-component.abstract";
import { EditorModeEnum } from "../../../../enums/editor-mode.enum";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ICrudService } from "../../../../interfaces/crud-service.interface";
import { ICrudEntity, ICrudListEntity } from "../../../../interfaces/crud-entity.interface";
import { Locker } from "../../../../utils/locker";
import { LockerTypeEnum } from "../../../../utils/locker-type.enum";
import { debounceTime, distinctUntilChanged, takeUntil, startWith, switchMap, catchError, tap } from "rxjs/operators";
import { trackExecution, check } from "./../../../../utils/custom-operators";
import { Observable, merge, of } from "rxjs";

export abstract class MatGenericTable<TEntity extends ICrudEntity, TListEntity extends ICrudListEntity<TEntity>> extends SafeComponent implements OnInit, AfterViewInit {

    protected abstract crudService: ICrudService<TEntity, TListEntity>;
    protected abstract columns: string[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild("apiFilterInput") apiFilterInput: ElementRef;

    locker = new Locker()
        .addLocker(LockerTypeEnum.HttpCall);

    displayedColumns: string[] = [];
    dataList: TListEntity;
    dataSource: MatTableDataSource<TEntity> = new MatTableDataSource([]);
    selectedItem: TEntity = null;
    mode: EditorModeEnum = EditorModeEnum.None;
    EditorModeEnum = EditorModeEnum;

    apiFilterValue: string = null;
    hardReload: EventEmitter<{}> = new EventEmitter();

    resultsLength = 0;
    isRateLimitReached = false;

    private readonly debounceTime = 1000;
    private readonly debounceTimeOperator = debounceTime(this.debounceTime);
    private readonly distinctUntilChangedOperator = distinctUntilChanged();
    private readonly loaderOperator = () => trackExecution(LockerTypeEnum.HttpCall, this.locker);

    constructor() {
        super();
    }

    ngOnInit(): void {

        this.displayedColumns = [...this.columns, "star"];

        this.sort.sortChange
            .pipe(
                takeUntil(this.unsubscriber)
            ).subscribe(() => this.paginator.pageIndex = 0);

        const getAll = (pageSize: number, pageIndex: number, query: string, sort: string, order: string) => this.crudService.getAll({
                limit: pageSize,
                skip: pageIndex * pageSize,
                query,
                sort,
                order
            })
            .pipe(
                this.loaderOperator()
            );

        const apiFilterValue$ = Observable.fromEvent(this.apiFilterInput.nativeElement, "keyup")
                .pipe(
                    this.debounceTimeOperator,
                    this.distinctUntilChangedOperator,
                );

        merge(
            this.sort.sortChange,
            this.paginator.page,
            this.hardReload,
            apiFilterValue$)
            .pipe(
                takeUntil(this.unsubscriber),
                startWith({}),
                switchMap(() => getAll(
                    this.paginator.pageSize || 5,
                    this.paginator.pageIndex || 0,
                    this.apiFilterValue || "",
                    this.sort.active,
                    this.sort.direction
                    )),
                check(this.unsubscriber, this.dataList, x => {
                    this.dataList = x;
                    this.resultsLength = x.count;
                    this.dataSource = new MatTableDataSource<TEntity>(x.items);
                }),
                catchError(() => of([]))
            ).subscribe();

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public get isLoading(): boolean {
        return this.locker.isLocked(LockerTypeEnum.HttpCall);
    }

    public isUpdateOrDeleteMode(element: TEntity): boolean {
        const result = element === this.selectedItem
            && (this.mode === EditorModeEnum.Update
                || this.mode === EditorModeEnum.Remove);
        return result;
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.resultsLength = this.dataSource.filteredData.length;
    }

    public applyApiFilter(filterValue: string) {
        this.apiFilterValue = filterValue;
    }

    public applyMode(mode: EditorModeEnum, selectedItem: TEntity) {
        this.mode = mode;
        this.selectedItem = selectedItem;
    }

    public addRow(): void {
        this.mode = EditorModeEnum.Add;
        this.confirm();
    }

    public clearSelection(): void {
        this.mode = null;
        this.selectedItem = null;
    }

    public confirm(): void {
        switch (this.mode) {
            case EditorModeEnum.Update: {
                const selectedItem = this.selectedItem;
                this.clearSelection();
                this.crudService.update(selectedItem.id, selectedItem)
                    .pipe(this.loaderOperator())
                    .subscribe();
            } break;
            case EditorModeEnum.Remove: {
                const selectedItem = this.selectedItem;
                this.clearSelection();
                this.crudService.remove(selectedItem.id)
                    .pipe(
                        this.loaderOperator(),
                        tap(() => this.hardReload.emit())
                    )
                    .subscribe();
            } break;
            case EditorModeEnum.Add: {
                this.crudService.add(<TEntity>{})
                    .pipe(
                        this.loaderOperator(),
                        tap(() => this.hardReload.emit())
                    )
                    .subscribe();
            } break;
            default: break;
        }
    }
}
